import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
//modify posts function definitions


//export get posts function so /routes/posts.js can use it
export const getPosts = async (req, res) => {
    try{
        //finding something in a model takes time so use 'await' to make it asynchronous
        const posts = await PostMessage.find();
        console.log(posts);

        //response
        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async (req, res) => {
    //assign the request to be the body of our post
    const postBody = req.body;
    const newPostBody = new PostMessage({...postBody, creator: req.userId, createdAt: new Date().toISOString() });

    try{
        //asynchronous action to save post
        await newPostBody.save();

        //response
        //for the 3 digit http values => 200s is success, 300s is redirection, 400s is client error, 500s is server errors
        res.status(201).json(newPostBody);
    }catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const bodyPost = req.body;
    
    //checks if valid id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...bodyPost, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    //checks if valid id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post was deleted." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated'});
    //checks if valid id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    //check if user already liked a post
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        //like post
        post.likes.push(req.userId)
    }
    else{
        //unlike post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}