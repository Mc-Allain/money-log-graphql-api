module.exports = `
  type Envelope {
    id: ID!
    name: String!
    balance: Float!
  }

  type Query {
    envelopes: [Envelope!]!
  }

  type Mutation {
    deposit(id: ID!, amount: Float!): Envelope
    withdraw(id: ID!, amount: Float!): Envelope
  }
`;
