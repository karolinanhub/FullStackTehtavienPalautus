import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogVisible, setblogVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

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
      <p>{blog.likes} likes <button>like</button></p>
      <p>{blog.user?.name}</p>
    </div>
  </div>
)}

export default Blog