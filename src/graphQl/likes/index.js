const { typeDefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutation");
const resolvers = require("./resolver");

const Likes = {
    typeDefs,
    queries,
    mutations,
    resolvers
}


module.exports = Likes;  