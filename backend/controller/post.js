import { response } from "express";
import mongoose from "mongoose";
import Posts from "../model/post.js";
import User from "../model/auth.js";
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
export const addPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    //validating if user is logged in or not
    const user = await User.findById(req.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "you must be logged in to add post" });

    //validating title and description
    if (!title || !description)
      return res.send({
        success: false,
        error: "title and description must not be blank",
      });

    const newPost = await new Posts({
      title,
      description,
      user: user._id,
    }).save();
    res.send({ success: true, post: newPost });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
export const answerPost = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    //validating if user is logged in  or not
    if (!user)
      return res.status(400).json({ success: false, error: error.message });
    const { answer, post_id } = req.body;
    //chgecking if post isd is valid
    if (!mongoose.isValidObjectId(post_id))
      return res.status(400).send({ success: false, error: "invalid post id" });
    const post = await Posts.findById(post_id);
    //validating if post exists
    if (!post)
      return res.status(400).json({ success: false, error: "post not found" });
    post.answers.push({ user: user._id, answer });
    //adding answers(using {new:true} to return updated(new) value)
    const upadtedPost = await Posts.findByIdAndUpdate(
      post_id,
      {
        answers: post.answers,
      },
      { new: true }
    );
    res.send({ success: true, answers: upadtedPost.answers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    //validating if user is logged in  or not
    if (!user)
      return res.status(400).json({ success: false, error: error.message });
    const { post_id } = req.body;
    //chgecking if post isd is valid
    if (!mongoose.isValidObjectId(post_id))
      return res.status(400).send({ success: false, error: "invalid post id" });
    const post = await Posts.findById(post_id);
    //validating if post exists
    if (!post)
      return res.status(400).json({ success: false, error: "post not found" });
    //checking if user has already liked the post
    const hasAlreadyLiked = post.likes.filter(
      (like) => like.user === user._id.toString()
    );
    //removing like if user has already liked
    if (hasAlreadyLiked.length) {
      post.likes = post.likes.filter(
        (like) => like.user !== user._id.toString()
      );
    } else {
      post.likes.push({ user: user._id.toString() });
    }
    //adding answers(using {new:true} to return updated(new) value)
    const upadtedPost = await Posts.findByIdAndUpdate(
      post_id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.send({ success: true, likes: upadtedPost.likes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    //validating if user is logged in  or not
    if (!user)
      return res.status(400).json({ success: false, error: error.message });
    const { title, description, post_id } = req.body;
    //chgecking if post isd is valid
    if (!mongoose.isValidObjectId(post_id))
      return res.status(400).send({ success: false, error: "invalid post id" });
    const post = await Posts.findById(post_id);
    //validating if post exists
    if (!post)
      return res.status(400).json({ success: false, error: "post not found" });
    //checking if user is autherised to edit the post
    if (post.user !== user._id.toString())
      return res
        .status(400)
        .send({
          success: false,
          error: "you are not autherised to edit this post",
        });

    //adding answers(using {new:true} to return updated(new) value)
    const upadtedPost = await Posts.findByIdAndUpdate(
      post_id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.send({ success: true, answers: upadtedPost });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    //validating if user is logged in  or not
    if (!user)
      return res.status(400).json({ success: false, error: error.message });
    const { post_id } = req.body;
    //chgecking if post isd is valid
    if (!mongoose.isValidObjectId(post_id))
      return res.status(400).send({ success: false, error: "invalid post id" });
    const post = await Posts.findById(post_id);
    //validating if post exists
    if (!post)
      return res.status(400).json({ success: false, error: "post not found" });
    //checking if user is autherised to delete the post
    if (post.user !== user._id.toString())
      return res
        .status(400)
        .send({
          success: false,
          error: "you are not autherised to delete this post",
        });

    //deleting post 
    await Posts.findByIdAndDelete(post_id);

    res.send({ success: true,message:'post deleted' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

