import express from 'express';
import { getAllPosts,addPost, likePost, updatePost, deletePost } from '../controller/post.js';
import authenticate from '../middleware/authenticate.js';
import { answerPost } from '../controller/post.js';
const Router=express.Router()
Router.get('/',getAllPosts);
Router.post('/addpost',authenticate,addPost);
Router.post('/answer',authenticate,answerPost);
Router.post('/likePost',authenticate,likePost);
Router.post('/updatePost',authenticate,updatePost);
Router.post('/deletePost',authenticate,deletePost);

export default Router;