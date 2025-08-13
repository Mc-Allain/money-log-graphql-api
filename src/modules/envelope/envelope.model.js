const Denomination = require('../constants/denomination');

// Mock data
let envelopes = [
  { id: '1', name: 'Standard', denominations: [
    { value: Denomination.PHP._20, quantity: 0 },
    { value: Denomination.PHP._50, quantity: 0 },
    { value: Denomination.PHP._100, quantity: 51 },
    { value: Denomination.PHP._200, quantity: 0 },
    { value: Denomination.PHP._500, quantity: 0 },
    { value: Denomination.PHP._1000, quantity: 0 },
  ] },
  { id: '2', name: 'Polymer', denominations: [
    { value: Denomination.PHP._20, quantity: 0 },
    { value: Denomination.PHP._50, quantity: 2 },
    { value: Denomination.PHP._100, quantity: 9 },
    { value: Denomination.PHP._200, quantity: 0 },
    { value: Denomination.PHP._500, quantity: 3 },
    { value: Denomination.PHP._1000, quantity: 45 },
  ] },
];

module.exports = { envelopes };
