import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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
    //console.log(`Adding like to blog: ${blog.title}`)
    const updatedBlog = {
      ...blog,
      likes: blogObject.likes + 1,
      user: blogObject.user
    }
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const deleteThisBlog = () => {
    console.log(`Deleting blog: ${blogObject.title}`)
    deleteBlog(blogObject)
  }

  const userCanDelete = user && blogObject.user && user.username === blogObject.user.username

  return (
    <div style={blogStyle} data-testid="blog">
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
        {userCanDelete &&
      (<button onClick={() => deleteThisBlog(blogObject)}>remove</button>)}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog