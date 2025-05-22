const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes){
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' }) // 400 Bad Request
  }
  const savedBlog = await blog.save()
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
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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