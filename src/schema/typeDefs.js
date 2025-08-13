
import { gql } from 'apollo-server-express';
import envelopeTypeDefs from '../modules/envelope/envelope.typeDefs.js';
import transactionTypeDefs from '../modules/transaction/transaction.typeDefs.js';

export default gql`
  ${envelopeTypeDefs}
  ${transactionTypeDefs}
`;
