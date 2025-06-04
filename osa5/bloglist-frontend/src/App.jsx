import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token) 
    } 
  }, []) // efekti suoritetaan kun komponentti renderöidään ensimmäisen kerran


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage({
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 
          type: 'success'})
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); 
      })
      .catch (error => {
        console.error('Error adding blog:', error) 
        setErrorMessage({
          message: 'error adding blog',
          type: 'error'
        })
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); 
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user) //token ja kirjautumistiedot tallennetaan
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        message: 'wrong username or password', 
        type: 'error'
      })  
      setTimeout(() => { 
        setErrorMessage(null) }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      {blogs
      .slice() //  pinnallinen kopio ettei muuteta alkuperäistä tilaa
      .sort((a, b) => b.likes - a.likes)
      .map(blog => 
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )

const updateBlog = async (updatedBlog) => {
  try {
    // console.log(`Updating blog: ${updatedBlog.id}`);
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    setBlogs(blogs.map(blog => 
      blog.id !== returnedBlog.id ? blog : returnedBlog
    ))
  } catch (error) {
    console.error('Failed to update blog:', error)
  }
}

const deleteBlog = async (newObject) => {
  try { 
    if (window.confirm(`Remove blog ${newObject.title} by ${newObject.author}?`)) {
      await blogService.remove(newObject.id)
    }
    setBlogs(blogs.filter(blog => blog.id !== newObject.id))
  } catch (error) {
    console.error('Failed to delete blog:', error)
  }
}

  return (
    <div>
      <Notification message={errorMessage?.message} type={errorMessage?.type}/>
      {!user && loginForm()}
      {user &&
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={() => {
              setUser(null)
              blogService.setToken(null) //tyhjennetään token logoutissa
              window.localStorage.removeItem('loggedBlogappUser')
            }}>logout</button></p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm createBlog={addBlog} />
      </Togglable>
          {blogForm()}
        </div>
      }
    </div>
  )

}

export default App