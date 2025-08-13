import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema/index.js';
import { createContext } from './context.js';

const app = express();
const server = new ApolloServer({
  schema,
  context: createContext,
});

const start = async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

start();