const { typeDefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutation");
const resolvers = require("./resolver");

const Comments = {
    typeDefs,
    queries,
    mutations,
    resolvers
}


module.exports = Comments;  