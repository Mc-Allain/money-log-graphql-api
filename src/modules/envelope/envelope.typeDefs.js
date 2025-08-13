module.exports = `
  type Envelope {
    id: ID!
    name: String!
    denominations: [Denomination!]!
  }

  type DenominationChange {
    changeId: ID!
    previousState: [Denomination!]!
    delta: Denomination!
  }

  type Denomination {
    value: String!
    quantity: Int!
  }

  type TransactionDetails {
    envelope: Envelope!
    transaction: Transaction!
  }

  type Query {
    envelopes: [Envelope!]!
  }

  type Mutation {
    envelope(id: ID!): Envelope!
    calculateTotal(id: ID!): Int!
    deposit(id: ID!, value: Int!, quantityChange: Int!): TransactionDetails
    withdraw(id: ID!, value: Int!, quantityChange: Int!): TransactionDetails
    getDenomChange(transactionId: ID!): DenominationChange!
  }
`;
