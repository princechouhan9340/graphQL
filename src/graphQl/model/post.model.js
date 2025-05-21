const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types


const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: ObjectId, required: true, ref: 'User' },
    likes: { type: Number, default: 0 },
    comments: [{ type: ObjectId, ref: 'Comment' }] 
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;  