// transaction.service.js
import { PrismaClient } from "@prisma/client";
import TransactionType from '../constants/transaction-type.js';

const prisma = new PrismaClient();

const addTransaction = async ({ envelopeId, type, value, quantityChange }) => {
  if (![TransactionType.DEPOSIT, TransactionType.WITHDRAWAL].includes(type)) {
    throw new Error("Invalid transaction type");
  }

  return await prisma.transaction.create({
    data: {
      envelopeId,
      type,
      value,
      quantityChange,
      timestamp: new Date(), // Prisma handles DateTime
    },
  });
}

const getTransactions = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { timestamp: "desc" }, // Order by timestamp descending
  });
  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found");
  }
  return transactions;
}

const getTransaction = async (transactionId) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });
  if (!transaction || transaction.length === 0) {
    throw new Error("Transaction not found");
  }
  return transaction;
}

const getTransactionsByEnvelope = async (envelopeId) => {
  const transactions = await prisma.transaction.findMany({
    where: { envelopeId },
    orderBy: { timestamp: "desc" },
  });
  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found for this envelope");
  }
  return transactions;
}

export { addTransaction, getTransactions, getTransaction, getTransactionsByEnvelope };
