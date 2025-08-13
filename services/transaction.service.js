// transaction.service.js
import { PrismaClient } from "@prisma/client";
const TransactionType = require('../constants/transaction-type');

const prisma = new PrismaClient();

async function addTransaction({ envelopeId, type, value, quantityChange }) {
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

async function getTransactions() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { timestamp: "desc" }, // Order by timestamp descending
  });
  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found");
  }
  return transactions;
}

async function getTransaction(id) {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });
  if (!transaction || transaction.length === 0) {
    throw new Error("Transaction not found");
  }
  return transaction;
}

async function getTransactionsByEnvelope(envelopeId) {
  const transactions = await prisma.transaction.findMany({
    where: { envelopeId },
    orderBy: { timestamp: "desc" },
  });
  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found for this envelope");
  }
  return transactions;
}

module.exports = {
  addTransaction,
  getTransactions,
  getTransaction,
  getTransactionsByEnvelope,
};
