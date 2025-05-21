const { ApolloServer } = require("@apollo/server");
const User = require("./users");
const Post = require("./post");


const graphqlServer = new ApolloServer({
  typeDefs: `
    ${User.typeDefs}
    ${Post.typeDefs}
    type Query {
       ${User.queries}
       ${Post.queries}
    }

    type Mutation {
       ${User.mutations}
       ${Post.mutations}
    }
    `,
  resolvers: {
    Post: {
      ...Post.resolvers.Post
    },
    Query: {
      ...User.resolvers.queries,
      ...Post.resolvers.queries
    },
    Mutation: {
      ...User.resolvers.mutations,
      ...Post.resolvers.mutations
    },
  },
})

module.exports = graphqlServer;
