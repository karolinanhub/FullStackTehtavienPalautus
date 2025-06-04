import { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setblogVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const addLikes = () => {
    //console.log(`Adding like to blog: ${blog.title}`);
    const updatedBlog = {
      ...blog,
      likes: blogObject.likes + 1,
      user: blogObject.user
    }
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  return (

  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={() => setblogVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={() => setblogVisible(false)}>hide</button>
      <p>{blog.url}</p>
      <p>{blogObject.likes} likes <button onClick={() => addLikes(blog.id)}>like</button></p>
      <p>{blogObject.user?.name}</p>
    </div>
  </div>
)}

export default Blog