module.exports = `
  type Transaction {
    id: ID!
    envelopeId: ID!
    type: String!
    value: Int!
    quantityChange: Int!
    timestamp: String!
  }

  type Query {
    transactions: [Transaction!]!
  }

  type Mutation {
    getTransaction(id: ID!): Transaction
    getTransactionsByEnvelope(envelopeId: ID!): [Transaction!]!
  }
`;
