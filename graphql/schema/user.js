module.exports = `#graphql
  extend type Mutation {
    insert_user_one(object: UserInput!): User!
  }

  input UserInput {
    name: String!
    accounts: [AccountInput!]!
  }

  type User {
    name: String!
    id: Int!
    accounts: [Account!]!
  }
`;
