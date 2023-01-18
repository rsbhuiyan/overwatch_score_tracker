import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';

//any routes with auth means user requires confirmation of user for each action
import auth from '../middleware/auth.js';
const router = express.Router();

//add a route
//once someone visits 'localhost5000/' this function is used
//req = request res = respond
// https://localhost:5000/posts
//   '/posts' initialized in index.js

//getPosts defined in /controller/posts.js
router.get('/', getPosts);

router.post('/', auth, createPost);

//router to update existing posts
router.patch('/:id', auth, updatePost);

//router to delete posts
router.delete('/:id', auth, deletePost);

//router to like posts
router.patch('/:id/likePost', auth, likePost);


export default router;

