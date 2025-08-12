const envelopeResolvers = require('../modules/envelope/envelope.resolvers');
const transactionResolvers = require('../modules/transaction/transaction.resolvers');

module.exports = {
  Query: {
    ...envelopeResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...envelopeResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};
