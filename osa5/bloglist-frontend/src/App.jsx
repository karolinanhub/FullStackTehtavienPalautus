import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

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

  const addBlog = (event) => {
    event.preventDefault()
    // console.log("Form submitted, JS handled this.")
    setNewBlogFormVisible(false);
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage({
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 
          type: 'success'})
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); 
      })
      .catch (error => {
        setErrorMessage({
          message: 'error adding blog',
          type: 'error'
        })
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); 
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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

  const newBlogForm = () => {
    const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
            <button onClick={() => setNewBlogFormVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            addBlog={addBlog}
            
          />
          <button onClick={() => setNewBlogFormVisible(false)}>cancel</button>
        </div>
    </div>
  )}

  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


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
          {newBlogForm()}
          {blogForm()}
        </div>
      }
    </div>
  )

}

export default App