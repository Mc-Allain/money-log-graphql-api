const TransactionType = require('../constants/transaction-type')
const Denomination = require('../constants/denomination')
// Mock data

let transactions = [
  {
    id: '1',
    envelopeId: '1',
    type: TransactionType.DEPOSIT,
    value: Denomination.PHP._100,
    quantityChange: 51,
    timestamp: "2025-08-13T03:40:31.126Z",
  },
  {
    id: '2',
    envelopeId: '2',
    type: TransactionType.DEPOSIT,
    value: Denomination.PHP._1000,
    quantityChange: 45,
    timestamp: "2025-08-13T03:40:31.126Z",
  },
  {
    id: '3',
    envelopeId: '2',
    type: TransactionType.DEPOSIT,
    value: Denomination.PHP._500,
    quantityChange: 3,
    timestamp: "2025-08-13T03:40:31.126Z",
  },
  {
    id: '4',
    envelopeId: '2',
    type: TransactionType.DEPOSIT,
    value: Denomination.PHP._100,
    quantityChange: 9,
    timestamp: "2025-08-13T03:40:31.126Z",
  },
  {
    id: '5',
    envelopeId: '2',
    type: TransactionType.DEPOSIT,
    value: Denomination.PHP._50,
    quantityChange: 2,
    timestamp: "2025-08-13T03:40:31.126Z",
  },
];

module.exports = { transactions };
