import { getTransaction, getTransactions, getTransactionsByEnvelope } from "../services/transaction.service.js";

export const Query = {
  transactions: async () => {
    return await getTransactions();
  },
};

export const Mutation = {
  transaction: async (_, { transactionId }) => {
    return await getTransaction(transactionId);
  },
  transactionByEnvelope: async (_, { envelopeId }) => {
    return await getTransactionsByEnvelope(envelopeId);
  }
};
