import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: String,
    name: String,
    hero: String,
    damage: Number,
    heals: Number,
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;