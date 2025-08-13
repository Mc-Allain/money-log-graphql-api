const TransactionType = require('../constants/transaction-type');
const { addTransaction } = require('../transaction/transaction.service');
const { envelopes, denominationChangeList } = require('./envelope.model');
const { updateDenomination, calculateTotal, addDenominationChange } = require('./envelope.service');

module.exports = {
  Query: {
    envelopes: () => envelopes,
  },
  Mutation: {
    envelope: (_, { id }) => {
      const envelope = envelopes.find(e => e.id === id);
      if (!envelope) throw new Error('Envelope not found');
      return envelope;
    },
    calculateTotal: (_, { id }) => {
      const envelope = envelopes.find(e => e.id === id);
      if (!envelope) throw new Error('Envelope not found');
      return calculateTotal(envelope);
    },
    deposit: (_, { id, value, quantityChange }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      const previousState = env.denominations.map(d => ({ ...d })); // Clone current denominations
      updateDenomination(env, value, quantityChange, true);
      const transaction = addTransaction({
        envelopeId: id,
        type: TransactionType.DEPOSIT,
        value,
        quantityChange
      })
      if (!transaction) {
        throw new Error('Transaction could not be created');
      }
      addDenominationChange(transaction.id, previousState, { value, quantity: env.denominations.find(d => d.value === value).quantity });
      return {
        envelope: env,
        transaction: transaction,
      };
    },
    withdraw: (_, { id, value, quantityChange }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      const previousState = env.denominations.map(d => ({ ...d })); // Clone current denominations
      updateDenomination(env, value, quantityChange, false);
      const transaction = addTransaction({
        envelopeId: id,
        type: TransactionType.WITHDRAWAL,
        value,
        quantityChange
      })
      if (!transaction) {
        throw new Error('Transaction could not be created');
      }
      addDenominationChange(transaction.id, previousState, { value, quantity: env.denominations.find(d => d.value === value).quantity });
      return {
        envelope: env,
        transaction: transaction,
      };
    },
    getDenomChange: (_, { transactionId }) => {
      const change = denominationChangeList.filter(denomChange => denomChange.changeId === transactionId);
      if (!change || change.length === 0) {
        throw new Error('No envelope changes found for this transaction');
      }
      return change[0];
    }
  },
};
