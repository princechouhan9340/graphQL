const { ApolloServer } = require("@apollo/server");
const User = require("./users");
const Post = require("./post");
const Likes = require("./likes");
const Comments = require('./comments')

const graphqlServer = new ApolloServer({
  typeDefs: `
    ${User.typeDefs}
    ${Post.typeDefs}
    ${Likes.typeDefs}
    ${Comments.typeDefs}
    type Query {
       ${User.queries}
       ${Post.queries}
       ${Likes.queries}
       ${Comments.queries}
    }

    type Mutation {
       ${User.mutations}
       ${Post.mutations}
       ${Likes.mutations}
       ${Comments.mutations}
    }
    `,
  resolvers: {
    Comments: {
      ...Comments.resolvers.Comments
    },
    Like: {
      ...Likes.resolvers.Like
    },
    Post: {
      ...Post.resolvers.Post,
    },
    Query: {
      ...User.resolvers.queries,
      ...Post.resolvers.queries,
      ...Likes.resolvers.queries,
      ...Comments.resolvers.queries
    },
    Mutation: {
      ...User.resolvers.mutations,
      ...Post.resolvers.mutations,
      ...Likes.resolvers.mutations,
      ...Comments.resolvers.mutations
    },
  },
})

module.exports = graphqlServer;
