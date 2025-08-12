const { transactions } = require('./transaction.model');

module.exports = {
  Query: {
    transactions: () => transactions,
  },
  Mutation: {
    logTransaction: (_, { id, name, transactionType, value, quantity }) => {
      const transaction = {
        id: id,
        name: name,
        transactionType: transactionType,
        value: value,
        quantity: quantity
      }
      return transaction;
    },
  },
};
