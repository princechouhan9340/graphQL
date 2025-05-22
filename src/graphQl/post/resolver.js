const { checkAuth } = require('../middleware');
const { getPost, getPosts, createPost,updatePost, deletePost} = require('../../services/post.service')
const { getUser } = require('../../services/user.service')
const { GraphQLScalarType, Kind } = require('graphql');
const { getLikes } = require('../../services/likes.service');
const { getAllComments } = require('../../services/comments.service');


const queries = {
    getPosts: async(_, payload, context) =>{
        checkAuth(context)
        return await getPosts(context.user._id)
    },

    getPost: async(_, {_id}, context) =>{
        checkAuth(context)
        return await getPost(_id)
    }
}

const mutations = {
    createPost: async(_, postData, context) =>{
        checkAuth(context)
        return await createPost(postData, context.user._id)
    },
    updatePost: async(_, postData, context) =>{
        checkAuth(context)
        return await updatePost(postData, context.user._id)
    },
    deletePost: async(_, {_id}, context) =>{
        checkAuth(context)
        return await deletePost(_id, context.user._id)
    }
}

const Post = {
    author: async(_, payload, context) =>{
        checkAuth(context)
        return await getUser(context.user._id)
    },

    likes: async({_id}) => {
        return await getLikes(_id)
    },

    comments: async({_id}) => {
       return await getAllComments(_id)
    }

}



const resolvers = {
    queries,
    mutations,
    Post
}

module.exports = resolvers