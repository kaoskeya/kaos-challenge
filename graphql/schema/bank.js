const BankType = `#graphql
    id: Int!
    name: String!
    branch: String!
    city: String!
`;

module.exports = `#graphql
  input BankInput {
    ${BankType}
  }

  type Bank {
    ${BankType}
    weather: Weather
  }
`;
