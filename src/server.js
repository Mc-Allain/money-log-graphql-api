const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./schema');
const { createContext } = require('./context');

const app = express();
const server = new ApolloServer({
  schema,
  context: createContext,
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

start();