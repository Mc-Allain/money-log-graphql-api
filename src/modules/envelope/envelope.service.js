const { denominationChangeList } = require("./envelope.model");

function calculateTotal(envelope) {
  return envelope.denominations.reduce((sum, entry) => {
    return sum + entry.value * entry.quantity;
  }, 0);
}

function updateDenomination(envelope, value, quantityChange, isDeposit = true) {
  const denom = envelope.denominations.find(d => d.value === value);
  if (!denom) throw new Error('Denomination not found');
  if (isDeposit && quantityChange <= 0) {
    throw new Error('Quantity change must be positive for deposits');
  } else if (!isDeposit && quantityChange <= 0) {
    throw new Error('Quantity change must be positive for withdrawals');
  } else if (!isDeposit && denom.quantity < quantityChange) {
    throw new Error('Not enough quantity to withdraw');
  }
  isDeposit ? denom.quantity += quantityChange : denom.quantity -= quantityChange;
  return envelope;
}

function addDenominationChange(changeId, previousState, delta) {
  denominationChangeList.push({
    changeId,
    previousState,
    delta
  });
}

module.exports = {
  calculateTotal,
  updateDenomination,
  addDenominationChange,
};
