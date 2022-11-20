import express from 'express';
import { getAllPosts,addPost, likePost } from '../controller/post.js';
import authenticate from '../middleware/authenticate.js';
import { answerPost } from '../controller/post.js';
const Router=express.Router()
Router.get('/',getAllPosts);
Router.post('/addpost',authenticate,addPost);
Router.post('/answer',authenticate,answerPost);
Router.post('/likePost',authenticate,likePost)
export default Router;