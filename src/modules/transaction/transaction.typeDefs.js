module.exports = `
  type Transaction {
    id: ID!
    name: String!
    transactionType: String!
    value: String!
    quantity: Int!
  }

  type Query {
    transactions: [Transaction!]!
  }

  type Mutation {
    logTransaction(id: ID!, name: String!, transactionType: String!, value: String!, quantity: Int!): Transaction
  }
`;
