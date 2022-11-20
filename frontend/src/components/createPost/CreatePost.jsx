import React from "react";
import { useState } from "react";
import "./CreatePost.css";
import {createPost} from '../../api/post.js'
const CreatePost = ({setPosts}) => {
    const [data,setdata]=useState([{title:'',description:''}]);
  const addPost = async(e) => {
    e.preventDefault();
    createPost({title:data.title,description:data.description}).then((data)=>{if(data){setPosts((posts)=>[...posts,data.post]);alert('queston added sucessfully')}else{alert('an error accured')}}).catch((error)=>{
        alert(error.message);
        console.log(error);
    })
  };
  //onChange on input for title
  const inputChangeHandler=(event)=>{
    //setting title state to input value
    setdata({...data,[event.target.name]:event.target.value})
  }
  return (
    <div id="createPost">
      <form onSubmit={addPost}>
        <h2>Ask Question</h2>
        <input placeholder="Enter Title" type="text" name="title" id="title" onChange={inputChangeHandler} />
        <input placeholder="Enter description" type="text" name="description" id="description"  onChange={inputChangeHandler}/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
