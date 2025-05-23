const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog 
    .find({}).populate('user', { username: 1, name: 1 }) //populate userin tiedot
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  if (!body.likes){
    blog.likes = 0
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' }) // 400 Bad Request
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id) //myös user olio muuttuu, kun siihen tallennetaan blogin id
  await user.save()

  response.status(201).json(savedBlog)
})

/*
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else { 
        response.status(404).end()
      }
    })
    .catch(error => next(error))
}) **/


blogsRouter.delete('/:id', async (request, response) => {
  const blogtoDelete = await Blog.findById(request.params.id)
  if (!blogtoDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = request.user
  if (!user) {    
    return response.status(401).json({ error: 'token invalid' }) 
  }  

  if ( blogtoDelete.user.toString() !== user.id.toString() ) {
    return response.status(401).json({ error: 'only the creator can delete the blog' })
  }
  else {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const {   
    title,
    author,
    url,
    likes } = request.body
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes}
  )
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


module.exports = blogsRouter