const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const commentSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    postId: { type: ObjectId, required: true, ref: 'Post' },
    comment: { type: String, required: true },
},{timestamps:true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;  // Export the model