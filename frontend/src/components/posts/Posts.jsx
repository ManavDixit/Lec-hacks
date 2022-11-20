import React from 'react'
import CreatePost from '../createPost/CreatePost'
import { useState,useEffect } from 'react'
import {getAllPosts} from '../../api/post.js'
import Post from '../post/Post'
import './Posts.css'
const Posts = () => {
    const [posts,setPosts]=useState([]);
    //getting all posts on mount 
    useEffect(()=>{
        const data=getAllPosts().then((data)=>setPosts(data)).catch((error)=>error);
    },[]);
  return (
    <div id='postscontainer'>
    <div id="ask">
        <CreatePost setPosts={setPosts}/>
    </div>
    <div id="posts">
      { /* <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/>
        <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/>
        <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/>
        <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/>
        <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/>
  <Post title={'Lorem ipsum dolor sit amet consectetur adipisicing eli'} description={'   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquam possimus, dignissimos adipisci quas consequuntur expedita nam minima, nobis delectus doloribus repellendus quae a beatae eveniet qui, illo quos quibusdam?'}/> */ }
  {posts.map(((post)=><Post key={post._id} title={post.title} description={post.description}/>))}
    </div>
    </div>
  )
}

export default Posts