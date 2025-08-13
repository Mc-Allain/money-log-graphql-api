
import envelopeResolvers from '../modules/envelope/envelope.resolvers.js';
import transactionResolvers from '../modules/transaction/transaction.resolvers.js';

export default {
  Query: {
    ...envelopeResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...envelopeResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};
