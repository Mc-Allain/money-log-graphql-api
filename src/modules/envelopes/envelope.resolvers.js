import {
  getEnvelopes,
  getEnvelope,
  performTransaction,
  calculateTotal,
  getDenomChange,
} from "./envelope.service.js";

export default envelopeResolvers = {
  Query: {
    envelopes: async () => {
      return await getEnvelopes();
    },
    envelope: async (envelopeId) => {
      return await getEnvelope(envelopeId);
    },
    calculateTotal: async (envelopeId) => {
      return await calculateTotal(envelopeId);
    },
    denomChange: async (transactionId) => {
      return await getDenomChange(transactionId);
    },
  },
  Mutation: {
    deposit: async (_, { envelopeId, value, quantityChange }) => {
      const envelope = await getEnvelope(envelopeId);
      const transaction = await performTransaction(
        envelope,
        value,
        quantityChange,
        true
      );
      return { envelope, transaction };
    },
    withdraw: async (_, { envelopeId, value, quantityChange }) => {
      const envelope = await getEnvelope(envelopeId);
      const transaction = await performTransaction(
        envelope,
        value,
        quantityChange,
        false
      );
      return { envelope, transaction };
    },
  },
};
