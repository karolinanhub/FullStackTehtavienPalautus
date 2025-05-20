const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
require('dotenv').config({ path: '.env' })
const Blog = require('../models/blog')
// superagent-olio
//Supertest huolehtii testattavan sovelluksen käynnistämisestä sisäisesti käyttämäänsä porttiin. 
const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

// Alustetaan tietokonata, ensin tyhjennetään ja sitten lisätään testidataa
beforeEach(async () => {  
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) //regex
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('identifier is "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.ok(blogs.length > 0, 'No blogs found in response')
  const blog = blogs[0]
  assert.equal(typeof blog.id, 'string')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('Type wars'))
})

test('a blog without likes has 0 likes', async () => {
  const newBlog = {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const addedBlog = response.body.find(blog => blog.title === newBlog.title)
  assert.strictEqual(addedBlog.likes, 0)
})
test('a blog without title or url is not added', async () => {
  const invalidBlogs = [
    {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/",
      likes: 10,
    },
    {
      author: "Robert C. Martin",
      title: "First class tests",
      likes: 10,
    }
  ]
  for (const blog of invalidBlogs) { 
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  }
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// lopuksi suljetaan yhteys tietokantaan
after(async () => {
  await mongoose.connection.close()
})