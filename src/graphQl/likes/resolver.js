const  { deleteLike, getLikes, createLike } =  require('../../services/likes.service')
const { checkAuth } = require('../middleware');
const { getUser } = require('../../services/user.service')


const queries = {
    getAllLikes: async (_, {postId}, context) => {
        return await getLikes(postId)
    }
}

const mutations = {
    createLike: async (_, {postId}, context) => {
        checkAuth(context)
        return await createLike(postId, context.user._id)
    },
    deleteLike: async (_, {postId}, context) => {
        checkAuth(context)
        return await deleteLike(postId, context.user._id)
    }
}

const Like = {
    user: async(like) => {
        const users = []
        for( let i=0;i<like.length;i++){
            users.push(await getUser(like[i].userId))
        }
        return users
    }
}

const resolvers = {
    queries,
    mutations,
    Like
}

module.exports = resolvers;  // eslint-disable-line no-undef