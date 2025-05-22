const { checkAuth } = require("../middleware");
const { getUser, getUsers, createUser, updateUser, deleteUser,  loginUser } = require("../../services/user.service");

const queries = {
    getUser: async (_, { email }, context) => {
        checkAuth(context)
        return await getUser(context.user.email);
    },
    getUsers: async (_, __, context) => {
        checkAuth(context)
        return await getUsers();
    },
    loginUser: async (_, { email, password }) => {
        return await loginUser(email, password);
    }
}

const mutations = {
    createUser: async (_, userData ) => {
        return await createUser(userData);
    },
    updateUser: async (_, userData, context) => {
        checkAuth(context)
        if(userData.email != context.user.email){
            throw new Error('You can only update your own account')
        }
        return await updateUser(userData);
    },
    deleteUser: async(_, { email }, context) => {
        checkAuth(context)
        if(userData.email != context.user.email){
            throw new Error('You can only update your own account')
        }
        return await deleteUser(email);
    }

        
}

const resolvers = {
    queries,
    mutations
}

module.exports = resolvers  // export queries and mutations