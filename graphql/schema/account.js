const AccountType = `#graphql
    ifsc: String!
    number: Int!
`;

module.exports = `#graphql
  input AccountInput {
    ${AccountType}
  }

  type Account {
    id: Int!
    ${AccountType}
    bank: Bank!
  }
`;
