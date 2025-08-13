const TransactionType = require('../constants/transaction-type')
const Denomination = require('../constants/denomination')
// Mock data

let transactions = [
  { id: '1', name: 'Initial Deposit to Standard', transactionType: TransactionType.DEPOSIT, value: Denomination.PHP.PHP_100, quantity: 51},
  { id: '2', name: 'Initial Deposit to Polymer', transactionType: TransactionType.DEPOSIT, value: Denomination.PHP.PHP_1000, quantity: 45},
  { id: '3', name: 'Initial Deposit to Polymer', transactionType: TransactionType.DEPOSIT, value: Denomination.PHP.PHP_500, quantity: 3},
  { id: '4', name: 'Initial Deposit to Polymer', transactionType: TransactionType.DEPOSIT, value: Denomination.PHP.PHP_100, quantity: 9},
  { id: '5', name: 'Initial Deposit to Polymer', transactionType: TransactionType.DEPOSIT, value: Denomination.PHP.PHP_50, quantity: 2},
];

module.exports = { transactions };
