const { getPost, getPosts, createPost,updatePost, deletePost} = require('../services/post.service')
const { getUser } = require('../services/user.service')
const { GraphQLScalarType, Kind } = require('graphql');

const queries = {
    getPosts: async(_, postData, context) =>{
        if(!context.user.email && !context.user._id){
            throw new error('Unautherized')
        }
        return await getPosts(context.user._id)
    },

    getPost: async(_, {_id}, context) =>{
        return await getPost(_id)
    }
}

const mutations = {
    createPost: async(_, postData, context) =>{
        if(!context.user.email && !context.user._id){
            throw new error('Unautherized')
        }
        return await createPost(postData, context.user._id)
    },
    updatePost: async(_, postData, context) =>{
        if(!context.user.email && !context.user._id){
            throw new error('Unautherized')
        }
        return await updatePost(postData, context.user._id)
    },
    deletePost: async(_, {_id}, context) =>{
        if(!context.user.email && !context.user._id){
            throw new error('Unautherized')
        }
        return await deletePost(_id, context.user._id)
    }
}

const Post = {
    author: async(_, postData, context) =>{
        if(!context.user.email && !context.user._id){
            throw new error('Unautherized')
        }
        return await getUser(context.user.email)
    }
}



const resolvers = {
    queries,
    mutations,
    Post
}

module.exports = resolvers