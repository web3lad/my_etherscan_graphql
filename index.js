// Importing ApolloServer from apollo-server package
const { ApolloServer } = require("apollo-server");
// Importing importSchema method from graphql-import package  
const { importSchema } = require("graphql-import");
// Importing EtherDataSource class 
const EtherDataSource = require("./datasource/ethDatasource");
// Importing schema from schema.graphql file
const typeDefs = importSchema("./schema.graphql"); 

// Configuring environment variables
require("dotenv").config();

// Defining resolvers
const resolvers = {
  Query: {
    // Resolver for etherBalanceByAddress query
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for totalSupplyOfEther query
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for latestEthereumPrice query
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for blockConfirmationTime query
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Creating ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiating EtherDataSource
    ethDataSource: new EtherDataSource(),  
  }),
});

// Setting timeout to 0
server.timeout = 0;
// Starting server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
