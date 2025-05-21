const { typeDefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutation");
const resolvers = require("./resolver");

const Post = {
    typeDefs,
    queries,
    mutations,
    resolvers
}


module.exports = Post;  