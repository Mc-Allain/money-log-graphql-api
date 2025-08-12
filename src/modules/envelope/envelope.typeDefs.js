module.exports = `
  type Envelope {
    id: ID!
    name: String!
    denominations: [Denomination!]!
  }

  type Denomination {
    value: String!
    currency: String!
    quantity: Int!
  }

  type Query {
    envelopes: [Envelope!]!
  }

  type Mutation {
    deposit(id: ID!, value: String!, quantity: Int!): Envelope
    withdraw(id: ID!, value: String!, quantity: Int!): Envelope
  }
`;
