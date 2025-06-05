import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { test, expect, vi } from 'vitest'

test('lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla', async () => {
  const blog = {
    title: 'Testataan yksittäistä blogia',
    author: 'Testaaja',
    url: 'www.testi.com',
  }

  const user = userEvent.setup()
  const createBlogMock =  vi.fn()

  render(<NewBlogForm createBlog={createBlogMock} />)

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'Testataan yksittäistä blogia')
  await user.type(inputs[1], 'Testaaja')
  await user.type(inputs[2], 'www.testi.com')
})
