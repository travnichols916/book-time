const { gql } = require('apollo-server-express');

// typeDefs.js: Define the necessary Query and Mutation types:

// Query type:

// me: Which returns a User type.
// Mutation type:

// login: Accepts an email and password as parameters; returns an Auth type.

// addUser: Accepts a username, email, and password as parameters; returns an Auth type.

// saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)



const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String,
    bookCount: Int,
    savedBooks: [Book]
  }
  type Book {
    _id: ID!
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(body: savedBooks!): User
    removeBook(bookId: ID!): User
  }
  input savedBooks {
    bookId: String!
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
`;


module.exports = typeDefs;
