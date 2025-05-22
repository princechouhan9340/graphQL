const Comments = require('../model/comment.model')
const { ObjectId } = require('mongoose').Types


const getAllComments = async(postId) => {
    try {
        const comments = await Comments.find({postId: new ObjectId(postId)}).lean()
        return comments
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

const createComment = async (data, userId) =>{
    try {
        const { comment, postId } = data
        const doc = new Comments({comment, postId : new Object(postId), userId})
        const result = await doc.save()
        if(!result){
            throw new Error('Failed to create comment')
        }
        return {
            message: 'Comment created successfully',
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

const deleteComment = async(commentId, userId) =>{
    try {
        const result = await Comments.findOneAndDelete({ _id: new ObjectId(commentId), userId})
        if(!result){
            throw new Error('Failed to delete comment')
        }
        return {
            message: 'Comment deleted successfully'
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = {
    getAllComments,
    createComment,
    deleteComment
}