import {
  getTransaction,
  getTransactions,
  getTransactionsByEnvelope,
} from "./transaction.service.js";

export default transactionResolvers = {
  Query: {
    transactions: async () => {
      return await getTransactions();
    },
    transaction: async (transactionId) => {
      return await getTransaction(transactionId);
    },
    transactionByEnvelope: async (envelopeId) => {
      return await getTransactionsByEnvelope(envelopeId);
    },
  },
};
