// envelope.typeDefs.js
import { gql } from "apollo-server-express";

export default gql`
  type Envelope {
    id: ID!
    name: String!
    denominations: [Denomination!]!
  }

  type Denomination {
    id: ID!
    value: PHP!
    quantity: Int!
  }

  type DenominationChange {
    id+: ID!
    previousState: [Denomination!]!
    delta: Denomination!
  }

  enum PHP {
    PHP_20
    PHP_50
    PHP_100
    PHP_200
    PHP_500
    PHP_1000
  }

  type Query {
    envelopes: [Envelope!]!
    envelope(envelopeId: ID!): Envelope
    calculateTotal(envelopeId: ID!): Int!
    denomChange(transactionId: ID!): DenominationChange!
  }

  type Mutation {
    deposit(id: ID!, value: PHP!, quantityChange: Int!): TransactionDetails
    withdraw(id: ID!, value: PHP!, quantityChange: Int!): TransactionDetails
  }

  type TransactionDetails {
    envelope: Envelope!
    transaction: Transaction!
  }
`;
