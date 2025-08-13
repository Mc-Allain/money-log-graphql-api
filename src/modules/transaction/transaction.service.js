const TransactionType = require('../constants/transaction-type');
const { transactions } = require('./transaction.model');

function addTransaction({ envelopeId, type, value, quantityChange }) {
  if (![TransactionType.DEPOSIT, TransactionType.WITHDRAWAL].includes(type)) {
    throw new Error('Invalid transaction type');
  }

  const transaction = {
    id: generateId(),
    envelopeId,
    type,
    value,
    quantityChange,
    timestamp: new Date().toISOString(),
  };

  transactions.push(transaction);
  return transaction;
}

function getTransaction(id) {
  return transactions.filter(tx => tx.id === id);
}

function getTransactionsByEnvelope(envelopeId) {
  return transactions.filter(tx => tx.envelopeId === envelopeId);
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  addTransaction,
  getTransaction,
  getTransactionsByEnvelope,
};
