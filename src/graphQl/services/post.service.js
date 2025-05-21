const Post = require('../model/post.model');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const getPosts = async (authorId) => {
    try {
        const post = await Post.find({author: new objectId(authorId)}).lean()
        if(post.length < 1){
            throw new Error('No posts found');
        }
        return post;
    } catch (error) {
        throw new error(error.message)
    }
}

const getPost = async (postId) => {
    try {
        const post = await Post.findById(postId);
        if(!post){
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new error(error.message)
    }
}

const createPost = async (postData, authorId) => {
    try {
        if(!authorId){
            throw new Error('Author ID is required');
        }
        postData.author = new objectId(authorId);
        const post = new Post(postData);
        await post.save();
        return post;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

const updatePost = async (postData, authorId) => {
    try {
        if(!authorId){
            throw new Error('Author ID is required');
        }
        postData.author = new objectId(authorId)
        const post = await Post.findByIdAndUpdate(postData._id, postData, {new: true});
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePost = async (postId) =>{
    try {
        const post = await Post.findByIdAndDelete(postId)
        if(!post){
            throw new Error('Post not found');
        }
        return {
            message: 'Post deleted successfully'
        };
    } catch (error) {
        
    }
}


module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
}