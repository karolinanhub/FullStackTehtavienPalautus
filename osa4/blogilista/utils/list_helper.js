const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  // Count the number of blogs for each author
  const authorBlogsCount = lodash.countBy(blogs, 'author') 
  // Find the author with the most blogs
  const mostBlogsAuthor = lodash.maxBy(Object.keys(authorBlogsCount), (author) => authorBlogsCount[author])
  return {  
    author: mostBlogsAuthor,
    blogs: authorBlogsCount[mostBlogsAuthor]  
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  // Count the number of likes for each author
  const authorLikesCount = lodash.reduce(blogs, (result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + blog.likes
    return result
  }, {})
  // Find the author with the most likes
  const mostLikesAuthor = lodash.maxBy(Object.keys(authorLikesCount), (author) => authorLikesCount[author])
  return {
    author: mostLikesAuthor,
    likes: authorLikesCount[mostLikesAuthor]
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}