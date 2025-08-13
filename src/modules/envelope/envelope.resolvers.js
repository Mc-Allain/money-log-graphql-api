const { envelopes } = require('./envelope.model');

module.exports = {
  Query: {
    envelopes: () => envelopes,
  },
  Mutation: {
    deposit: (_, { id, value, quantity }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      const denomination = env.denominations.find(d => d.value === value);
      denomination.quantity += quantity;
      env.denominations = env.denominations.map(d =>
        d.value === value ? denomination : d
      );
      return env;
    },
    withdraw: (_, { id, value, quantity }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      const denomination = env.denominations.find(d => d.value === value);
      if (denomination.quantity === 0) throw new Error('Not enough quantity');
      denomination.quantity -= quantity;
      env.denominations = env.denominations.map(d =>
        d.value === value ? denomination : d
      );
      return env;
    },
  },
};
