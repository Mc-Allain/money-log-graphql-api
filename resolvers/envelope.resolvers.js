import { getEnvelopes, getEnvelope, performTransaction, calculateTotal, getDenomChange } from "./envelope.service.js";

export const Query = {
  envelopes: async () => {
    return await getEnvelopes();
  },
};

export const Mutation = {
  envelope: async (_, { envelopeId }) => {
    return await getEnvelope(envelopeId);
  },
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
  calculateTotal: async (_, { envelopeId }) => {
    return await calculateTotal(envelopeId);
  },
  denomChange: async (_, { transactionId }) => {
    return await getDenomChange(transactionId);
  },
};
