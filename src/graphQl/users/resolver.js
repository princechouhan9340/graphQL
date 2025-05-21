const { getUser, getUsers, createUser, updateUser, deleteUser,  loginUser } = require("../services/user.service");


const queries = {
    getUser: async (_, { email }, { dataSources }) => {
        return await getUser(email);
    },
    getUsers: async (_, __, { dataSources }) => {
        return await getUsers();
    },
    loginUser: async (_, { email, password }, { dataSources }) => {
        return await loginUser(email, password);
    }
}

const mutations = {
    createUser: async (_, userData , { dataSources }) => {
        return await createUser(userData);
    },
    updateUser: async (_, userData, { dataSources }) => {
        return await updateUser(userData);
    },
    deleteUser: async(_, { email }, { dataSources }) => {
        return await deleteUser(email);
    }

        
}

const resolvers = {
    queries,
    mutations
}

module.exports = resolvers  // export queries and mutations