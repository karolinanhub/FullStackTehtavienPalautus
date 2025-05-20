const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})



blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.likes){
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' }) // 400 Bad Request
  }
  blog.save()
    .then(result => {
        response.status(201).json(result) // 201 Created
    })
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
})



blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.content = content
      blog.important = important

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})

*/

module.exports = blogsRouter