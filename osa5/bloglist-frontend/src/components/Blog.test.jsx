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

// blogin sisältöä näytetään tai piilotetaan sen mukaan, mikä on blogVisible-tilan arvo, Vaikka nämä osat eivät näy selaimessa, ne ovat silti olemassa DOMissa, koska display: none ei poista niitä — se vain piilottaa ne.
//Testing Library näkee ne oletusarvoisesti, joten testisi saattavat "löytää" piilotetun tekstin, vaikka käyttäjä ei sitä näkisi.
test('renderöi blogin ja url ja likes ei näy'),  () => {
  render(<Blog blog={blog} updateBlog={updateBlogMock} user={user} deleteBlog={deleteBlogMock}/>)
  expect(screen.getByText(`${blog.likes} likes`)).not.toBeVisible()
  expect(screen.getByText(blog.url)).not.toBeVisible()
}

test('renderöi blogin url ja likes, kun painetaan view', async () => {
  render(<Blog blog={blog} updateBlog={updateBlogMock} user={user} deleteBlog={deleteBlogMock}/>)

  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(blog.url)).toBeVisible()
  expect(screen.getByText(`${blog.likes} likes`)).toBeVisible()
})

test('like-nappia painetaan kahdesti ja tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.', async () => {
  render(<Blog blog={blog} updateBlog={updateBlogMock} user={user} deleteBlog={deleteBlogMock}/>)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlogMock.mock.calls).toHaveLength(2)
})

