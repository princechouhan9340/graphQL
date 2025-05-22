const  {checkAuth} = require('../middleware')
const { getAllComments, createComment, deleteComment } = require('../../services/comments.service')
const { getUser } = require('../../services/user.service')

const queries = {
    getAllComments: async (_, {postId}, context) =>{
        return await getAllComments(postId)
    }
}

const mutations = {
    createComment: async(_,commentData, context) => {
        checkAuth(context)
        return await createComment(commentData, context.user._id)
    },
    deleteComment: async(_,{commentId}, context) =>{
        checkAuth(context)
        return await deleteComment(commentId, context.user._id)
    }
}

const Comments = {
    user: async(comments) => {
        return await getUser(comments.userId)
    }
}

const resolvers = {
    queries,
    mutations,
    Comments
}

module.exports = resolvers