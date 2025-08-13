import { PrismaClient, TransactionType } from '@prisma/client';
import { PHP } from '../../src/modules/constants/denomination'

const prisma = new PrismaClient();

async function main() {``
  const transactions = [
    {
      id: '1',
      envelopeId: '1',
      type: TransactionType.DEPOSIT,
      value: PHP.PHP_100,
      quantityChange: 51,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '2',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: PHP.PHP_1000,
      quantityChange: 45,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '3',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: PHP.PHP_500,
      quantityChange: 3,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '4',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: PHP.PHP_100,
      quantityChange: 9,
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: '5',
      envelopeId: '2',
      type: TransactionType.DEPOSIT,
      value: PHP.PHP_50,
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
