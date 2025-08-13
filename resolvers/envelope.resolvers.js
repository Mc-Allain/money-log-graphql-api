import { PrismaClient } from "@prisma/client";
const {
  getEnvelope,
  performTransaction,
  calculateTotal,
  getDenomChange,
} = require('./envelope.service');

const prisma = new PrismaClient();

module.exports = {
  Query: {
    envelopes: async () => {
      const envelopes = await prisma.envelope.findMany();
      if (!envelopes || envelopes.length === 0) {
        throw new Error("No envelopes found");
      }
      return envelopes;
    },
  },
  Mutation: {
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
    getDenomChange: async (_, { transactionId }) => {
      return await getDenomChange(transactionId);
    },
  },
};
