
const { typeDefs } = require("./typedef");
const { queries } = require("./queries");
const { mutations } = require("./mutation");
const resolvers = require("./resolver");

// Export the combined object using CommonJS
const User = {
  typeDefs,
  queries,
  mutations,
  resolvers,
};
module.exports = User