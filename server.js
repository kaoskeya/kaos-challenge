const app = require("express")();
require("dotenv").config();
const db = require("./db/models");

db.sequelize.sync().then(() => {
  console.log(`Database connected!`);
});

const graphqlPath = process.env.GQL_PATH || "/graphql";
const port = process.env.PORT || 3000;

const apollo = require("./graphql").apollo;

async function startApolloServer(typeDefs, resolvers) {
  await apollo.start();
  apollo.applyMiddleware({ app: app, graphqlPath });

  server = app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
}

startApolloServer();
