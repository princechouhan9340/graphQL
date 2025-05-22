const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types;

const likesSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    postId: { type: ObjectId, required: true, ref: 'Post' },
    like: { type: Boolean, required: true, default: true }
},{timestamps:true})

const Likes = mongoose.model('Likes', likesSchema)

module.exports = Likes