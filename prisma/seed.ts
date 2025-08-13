import { PrismaClient, TransactionType } from '@prisma/client';
import Denomination from '../src/modules/constants/denomination'

const prisma = new PrismaClient();

async function main() {
  // Seed envelopes with denominations
  const envelopes = [
    {
      id: '1',
      name: 'Standard',
      denominations: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 51 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 0 },
        { value: Denomination.PHP.PHP_1000, quantity: 0 },
      ],
    },
    {
      id: '2',
      name: 'Polymer',
      denominations: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 2 },
        { value: Denomination.PHP.PHP_100, quantity: 9 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 3 },
        { value: Denomination.PHP.PHP_1000, quantity: 45 },
      ],
    },
  ];

  for (const envelope of envelopes) {
    await prisma.envelope.create({
      data: {
        id: envelope.id,
        name: envelope.name,
        denominations: {
          create: envelope.denominations.map(d => ({
            value: d.value,
            quantity: d.quantity,
          })),
        },
      },
    });
  }

  // Seed denomination changes
  const denominationChangeList = [
    {
      changeId: '1',
      previousState: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 0 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 0 },
        { value: Denomination.PHP.PHP_1000, quantity: 0 },
      ],
      delta: { value: Denomination.PHP.PHP_100, quantity: 51 },
    },
    {
      changeId: '2',
      previousState: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 0 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 0 },
        { value: Denomination.PHP.PHP_1000, quantity: 0 },
      ],
      delta: { value: Denomination.PHP.PHP_1000, quantity: 45 },
    },
    {
      changeId: '3',
      previousState: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 0 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 0 },
        { value: Denomination.PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: Denomination.PHP.PHP_500, quantity: 3 },
    },
    {
      changeId: '4',
      previousState: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 0 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 3 },
        { value: Denomination.PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: Denomination.PHP.PHP_100, quantity: 9 },
    },
    {
      changeId: '5',
      previousState: [
        { value: Denomination.PHP.PHP_20, quantity: 0 },
        { value: Denomination.PHP.PHP_50, quantity: 0 },
        { value: Denomination.PHP.PHP_100, quantity: 9 },
        { value: Denomination.PHP.PHP_200, quantity: 0 },
        { value: Denomination.PHP.PHP_500, quantity: 3 },
        { value: Denomination.PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: Denomination.PHP.PHP_50, quantity: 2 },
    },
  ];

  for (const change of denominationChangeList) {
    await prisma.denominationChange.create({
      data: {
        id: change.changeId,
        previousState: {
          create: change.previousState.map(d => ({
            value: d.value,
            quantity: d.quantity,
          })),
        },
        delta: {
          create: {
            value: change.delta.value,
            quantity: change.delta.quantity,
          },
        },
      },
    });
  }

  const transactions = [
    {
      id: '1',
      envelopeId: '1',
      type: TransactionType.DEPOSIT,
      value: Denomination.PHP.PHP_100,
      quantityChange: 51,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '2',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: Denomination.PHP.PHP_1000,
      quantityChange: 45,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '3',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: Denomination.PHP.PHP_500,
      quantityChange: 3,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '4',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: Denomination.PHP.PHP_100,
      quantityChange: 9,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '5',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: Denomination.PHP.PHP_50,
      quantityChange: 2,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({
      data: {
        id: tx.id,
        envelopeId: tx.envelopeId,
        type: tx.type,
        value: tx.value,
        quantityChange: tx.quantityChange,
        timestamp: tx.timestamp,
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
