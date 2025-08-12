// Mock data
let envelopes = [
  { id: '1', name: 'Standard', denominations: [
    { value: '₱20', currency: 'Philippine peso', quantity: 10 },
    { value: '₱50', currency: 'Philippine peso', quantity: 5 },
    { value: '₱100', currency: 'Philippine peso', quantity: 7 },
    { value: '₱200', currency: 'Philippine peso', quantity: 0 },
    { value: '₱500', currency: 'Philippine peso', quantity: 4 },
    { value: '₱1000', currency: 'Philippine peso', quantity: 20 },
  ] },
  { id: '2', name: 'Polymer', denominations: [
    { value: '₱20', currency: 'Philippine peso', quantity: 0 },
    { value: '₱50', currency: 'Philippine peso', quantity: 2 },
    { value: '₱100', currency: 'Philippine peso', quantity: 10 },
    { value: '₱200', currency: 'Philippine peso', quantity: 1 },
    { value: '₱500', currency: 'Philippine peso', quantity: 2 },
    { value: '₱1000', currency: 'Philippine peso', quantity: 25 },
  ] },
];

module.exports = { envelopes };
