const Likes = require('../model/likes.model')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const getLikes = async (postId) => {
    try {
        const likes = await Likes.find({ postId: new ObjectId(postId) }).lean()
        return likes
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

const createLike = async(postId, userId) =>{
    try {
        const isPresent = await Likes.findOne({postId: new ObjectId(postId), userId: new ObjectId(userId)})
        if(isPresent){
            throw new Error('You have already liked this post')
        }
        const like = new Likes({postId: new ObjectId(postId), userId: new ObjectId(userId)})
        const newDoc = await like.save()
        if(!newDoc){
            throw new Error('Error creating like')
        }
        return {
            message: 'Like created successfully',
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

const deleteLike = async (docId, userId) =>{
    try {
        const like = await Likes.findOneAndDelete({_id: new ObjectId(docId), userId: new ObjectId(userId)})
        if(!like){
            throw new Error('Error deleting like')
        }
        return {
            message: 'Like deleted successfully'
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = {
    getLikes,
    createLike,
    deleteLike
}


