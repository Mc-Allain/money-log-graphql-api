const { transactions } = require('./transaction.model');
const { getTransaction, getTransactionsByEnvelope } = require('./transaction.service');

module.exports = {
  Query: {
    transactions: () => transactions,
  },
  Mutation: {
    getTransaction: (_, { id }) => {
      const transaction = getTransaction(id);
      if (!transaction || transaction.length === 0) {
        throw new Error('Transaction not found');
      }
      return transaction[0];
    },
    getTransactionsByEnvelope: (_, { envelopeId }) => {
      const transactions = getTransactionsByEnvelope(envelopeId);
      if (!transactions || transactions.length === 0) {
        throw new Error('No transactions found for this envelope');
      }
      return transactions;
    },
  }
};
