import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

const DenominationValueMap = {
  PHP_20: 20,
  PHP_50: 50,
  PHP_100: 100,
  PHP_200: 200,
  PHP_500: 500,
  PHP_1000: 1000,
} as const;

const main = async () => {
  // Seed envelopes with denominations

  type DenominationEntry = {
    value: number;
    quantity: number;
  };

  type Envelope = {
    id: string;
    name: string;
    denominations: DenominationEntry[];
  };

  const envelopes: Envelope[] = [
    {
      id: "1",
      name: "Standard",
      denominations: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 51 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 0 },
        { value: DenominationValueMap.PHP_1000, quantity: 0 },
      ],
    },
    {
      id: "2",
      name: "Polymer",
      denominations: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 2 },
        { value: DenominationValueMap.PHP_100, quantity: 9 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 3 },
        { value: DenominationValueMap.PHP_1000, quantity: 45 },
      ],
    },
  ];

  for (const envelope of envelopes) {
    await prisma.envelope.create({
      data: {
        id: envelope.id,
        name: envelope.name,
        denominations: {
          create: envelope.denominations,
        },
      },
    });
  }

  // Seed transactions

  type Transaction = {
    id: string;
    envelopeId: string;
    type: TransactionType;
    previousState: DenominationEntry[];
    delta: DenominationEntry;
    timestamp: Date;
  };

  const transactions: Transaction[] = [
    {
      id: "1",
      envelopeId: "1",
      type: TransactionType.DEPOSIT,
      previousState: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 0 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 0 },
        { value: DenominationValueMap.PHP_1000, quantity: 0 },
      ],
      delta: { value: DenominationValueMap.PHP_100, quantity: 51 },
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: "2",
      envelopeId: "2",
      type: TransactionType.DEPOSIT,
      previousState: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 0 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 0 },
        { value: DenominationValueMap.PHP_1000, quantity: 0 },
      ],
      delta: { value: DenominationValueMap.PHP_1000, quantity: 45 },
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: "3",
      envelopeId: "2",
      type: TransactionType.DEPOSIT,
      previousState: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 0 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 0 },
        { value: DenominationValueMap.PHP_1000, quantity: 45 },
      ],
      delta: { value: DenominationValueMap.PHP_500, quantity: 3 },
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: "4",
      envelopeId: "2",
      type: TransactionType.DEPOSIT,
      previousState: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 0 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 3 },
        { value: DenominationValueMap.PHP_1000, quantity: 45 },
      ],
      delta: { value: DenominationValueMap.PHP_100, quantity: 9 },
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
    {
      id: "5",
      envelopeId: "2",
      type: TransactionType.DEPOSIT,
      previousState: [
        { value: DenominationValueMap.PHP_20, quantity: 0 },
        { value: DenominationValueMap.PHP_50, quantity: 0 },
        { value: DenominationValueMap.PHP_100, quantity: 9 },
        { value: DenominationValueMap.PHP_200, quantity: 0 },
        { value: DenominationValueMap.PHP_500, quantity: 3 },
        { value: DenominationValueMap.PHP_1000, quantity: 45 },
      ],
      delta: { value: DenominationValueMap.PHP_50, quantity: 2 },
      timestamp: new Date("2025-08-13T03:40:31.126Z"),
    },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({
      data: {
        id: tx.id,
        envelopeId: tx.envelopeId,
        type: tx.type,
        previousState: {
          create: tx.previousState,
        },
        delta: tx.delta
          ? {
              create: tx.delta,
            }
          : undefined,
        timestamp: tx.timestamp,
      },
    });
  }
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
