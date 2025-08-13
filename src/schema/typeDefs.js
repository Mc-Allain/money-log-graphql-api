const { gql } = require('apollo-server-express');
const envelopeTypeDefs = require('../modules/envelope/envelope.typeDefs');
const transactionTypeDefs = require('../modules/transaction/transaction.typeDefs');

module.exports = gql`
  ${envelopeTypeDefs}
  ${transactionTypeDefs}
`;
