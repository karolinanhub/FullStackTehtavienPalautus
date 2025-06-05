import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, expect, vi } from 'vitest'

let component
const blog = {
  title: 'Testataan yksittäistä blogia',
  author: 'Janne',
  url: 'www.blogi.com',
  likes: 10000
}
const user = userEvent.setup()
const updateBlogMock =  vi.fn()
const deleteBlogMock = vi.fn()


test('renderöi blogin titlen', () => {
  component = render(<Blog blog={blog} updateBlog={updateBlogMock} user={user} deleteBlog={deleteBlogMock}/>)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
})