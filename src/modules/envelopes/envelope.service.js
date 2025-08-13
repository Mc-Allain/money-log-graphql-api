// envelope.service.js
import { PrismaClient } from "@prisma/client";
import { addTransaction } from "../transaction/transaction.service.js";
import TransactionType from "../constants/transaction-type.js";

const prisma = new PrismaClient();

const getEnvelopes = async () => {
  const envelopes = await prisma.envelope.findMany();
  if (!envelopes || envelopes.length === 0) {
    throw new Error("No envelopes found");
  }
  return envelopes;
};

const getEnvelope = async (envelopeId) => {
  const envelope = await prisma.envelope.findUnique({
    where: { id: envelopeId },
  });
  if (!envelope) {
    throw new Error("Envelope not found");
  }
  return envelope;
};

const calculateTotal = async (envelopeId) => {
  const denominations = await prisma.denomination.findMany({
    where: { envelopeId },
  });

  if (!denominations || denominations.length === 0) {
    throw new Error("No denominations found for this envelope");
  }

  return denominations.reduce((sum, entry) => {
    return sum + entry.value * entry.quantity;
  }, 0);
};

const getDenomChange = async (transactionId) => {
  const change = await prisma.denominationChange.findFirst({
    where: { changeId: transactionId },
  });
  if (!change) {
    throw new Error("No envelope changes found for this transaction");
  }
  return change[0];
};

const performTransaction = async (
  envelope,
  value,
  quantityChange,
  isDeposit
) => {
  const previousState = envelope.denominations.map((d) => ({ ...d })); // Clone current denominations
  const updatedDenomination = await updateDenomination({
    envelopeId: envelope.id,
    value,
    quantityChange,
    isDeposit: isDeposit,
  });

  const transaction = await addTransaction({
    envelopeId: envelope.id,
    type: isDeposit ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL,
    value,
    quantityChange,
  });

  if (!transaction) {
    throw new Error("Transaction could not be created");
  }

  const denominationChange = await addDenominationChange(
    transaction.id,
    previousState,
    updatedDenomination
  );

  if (!denominationChange) {
    throw new Error("Denomination change could not be recorded");
  }

  return transaction;
};

const updateDenomination = async ({
  envelopeId,
  value,
  quantityChange,
  isDeposit = true,
}) => {
  const denom = await prisma.denomination.findFirst({
    where: { envelopeId, value },
  });

  if (!denom) throw new Error("Denomination not found");
  if (quantityChange <= 0) throw new Error("Quantity change must be positive");
  if (!isDeposit && denom.quantity < quantityChange) {
    throw new Error("Not enough quantity to withdraw");
  }

  const newQuantity = isDeposit
    ? denom.quantity + quantityChange
    : denom.quantity - quantityChange;

  return await prisma.denomination.update({
    where: { id: denom.id },
    data: { quantity: newQuantity },
  });
};

const addDenominationChange = async (changeId, previousState, delta) => {
  return await prisma.denominationChange.create({
    data: {
      id: changeId,
      previousState: {
        create: previousState.map((d) => ({
          value: d.value,
          quantity: d.quantity,
        })),
      },
      delta: {
        create: {
          value: delta.value,
          quantity: delta.quantity,
        },
      },
    },
  });
};

export { getEnvelopes, getEnvelope, performTransaction, calculateTotal, getDenomChange };
