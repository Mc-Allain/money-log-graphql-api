import { PrismaClient } from '@prisma/client';
import PHP from '../../src/modules/constants/denomination'

const prisma = new PrismaClient();

async function main() {
  // Seed envelopes with denominations
  const envelopes = [
    {
      id: '1',
      name: 'Standard',
      denominations: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 51 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 0 },
        { value: PHP.PHP_1000, quantity: 0 },
      ],
    },
    {
      id: '2',
      name: 'Polymer',
      denominations: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 2 },
        { value: PHP.PHP_100, quantity: 9 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 3 },
        { value: PHP.PHP_1000, quantity: 45 },
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
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 0 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 0 },
        { value: PHP.PHP_1000, quantity: 0 },
      ],
      delta: { value: PHP.PHP_100, quantity: 51 },
    },
    {
      changeId: '2',
      previousState: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 0 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 0 },
        { value: PHP.PHP_1000, quantity: 0 },
      ],
      delta: { value: PHP.PHP_1000, quantity: 45 },
    },
    {
      changeId: '3',
      previousState: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 0 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 0 },
        { value: PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: PHP.PHP_500, quantity: 3 },
    },
    {
      changeId: '4',
      previousState: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 0 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 3 },
        { value: PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: PHP.PHP_100, quantity: 9 },
    },
    {
      changeId: '5',
      previousState: [
        { value: PHP.PHP_20, quantity: 0 },
        { value: PHP.PHP_50, quantity: 0 },
        { value: PHP.PHP_100, quantity: 9 },
        { value: PHP.PHP_200, quantity: 0 },
        { value: PHP.PHP_500, quantity: 3 },
        { value: PHP.PHP_1000, quantity: 45 },
      ],
      delta: { value: PHP.PHP_50, quantity: 2 },
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
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
