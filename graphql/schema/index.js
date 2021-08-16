const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const typeDefs = [];

const Query = `#graphql
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

typeDefs.push(Query);

// import all schema files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const typeDef = require(path.join(__dirname, file));
    typeDefs.push(typeDef);
  });

module.exports = typeDefs;
