const { gql } = require('apollo-server-express');
const envelopeTypeDefs = require('../modules/envelope/envelope.typeDefs');

module.exports = gql`
  ${envelopeTypeDefs}
`;
