import React from 'react'
import './Post.css'
const Post = ({title,description}) => {
  return (
    <div className='post'>
        <div className="title">
            {title}
        </div>
        <div className="description">{description}</div>
    </div>
  )
}

export default Post