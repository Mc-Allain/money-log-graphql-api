const envelopeResolvers = require('../modules/envelope/envelope.resolvers');

module.exports = {
  Query: {
    ...envelopeResolvers.Query,
  },
  Mutation: {
    ...envelopeResolvers.Mutation,
  },
};
