const express = require('express');
const {ApolloServer} = require('apollo-server-express');

const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on localhost:${PORT}`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)}
    );
  });
}

startServer()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.use(routes);


