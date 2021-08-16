module.exports = `#graphql
  extend type Query {
    getUser(id: Int): User
    getUsers: [User]
  }

  extend type Mutation {
    insertUser(object: UserInput!): User!
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
