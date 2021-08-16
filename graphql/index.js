const typeDefs = require("./schema");
const resolvers = require("./resolver");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const userAPI = require("./controller/user");

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    return {};
  },
  dataSources: () => {
    return {
      userAPI,
    };
  },
});

module.exports = {
  apollo,
};
