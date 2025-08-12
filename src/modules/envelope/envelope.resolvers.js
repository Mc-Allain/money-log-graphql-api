const { envelopes } = require('./envelope.model');

module.exports = {
  Query: {
    envelopes: () => envelopes,
  },
  Mutation: {
    deposit: (_, { id, amount }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      env.balance += amount;
      return env;
    },
    withdraw: (_, { id, amount }) => {
      const env = envelopes.find(e => e.id === id);
      if (!env) throw new Error('Envelope not found');
      env.balance -= amount;
      return env;
    },
  },
};
