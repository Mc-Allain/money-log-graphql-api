
import { gql } from 'apollo-server-express';
import envelopeTypeDefs from '../modules/envelope/envelope.typeDefs.js';
import transactionTypeDefs from '../modules/transaction/transaction.typeDefs.js';

const typeDefs = gql`
  ${envelopeTypeDefs}
  ${transactionTypeDefs}
`;
export default typeDefs;
