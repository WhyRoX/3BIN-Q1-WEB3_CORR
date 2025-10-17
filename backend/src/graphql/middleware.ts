import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import * as expenseRepository from "../api/expense/expenseRepository.js";

const typeDefs = `#graphql
    type User {
      id: ID!
      name: String!
      email: String
    }

    type Expense {
      id: ID!
      description: String!
      amount: Float!
      date: String!
      payer: User!
      participants: [User!]!
    }

    type Query {
      expense(id: Int!): Expense
    }
`;

const resolvers = {
  Query: {
    expense: async (_parent: any, args: any, _context: any) =>
      expenseRepository.getExpenseById(args.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const graphqlMiddleware = expressMiddleware(server);

export default graphqlMiddleware;
