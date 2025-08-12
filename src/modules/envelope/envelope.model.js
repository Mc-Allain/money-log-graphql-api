const Denomination = require('../constants/denomination');

// Mock data
let envelopes = [
  { id: '1', name: 'Standard', denominations: [
    { value: Denomination.PHP.PHP_20, quantity: 0 },
    { value: Denomination.PHP.PHP_50, quantity: 0 },
    { value: Denomination.PHP.PHP_100, quantity: 51 },
    { value: Denomination.PHP.PHP_200, quantity: 0 },
    { value: Denomination.PHP.PHP_500, quantity: 0 },
    { value: Denomination.PHP.PHP_1000, quantity: 0 },
  ] },
  { id: '2', name: 'Polymer', denominations: [
    { value: Denomination.PHP.PHP_20, quantity: 0 },
    { value: Denomination.PHP.PHP_50, quantity: 2 },
    { value: Denomination.PHP.PHP_100, quantity: 9 },
    { value: Denomination.PHP.PHP_200, quantity: 0 },
    { value: Denomination.PHP.PHP_500, quantity: 3 },
    { value: Denomination.PHP.PHP_1000, quantity: 45 },
  ] },
];

module.exports = { envelopes };
