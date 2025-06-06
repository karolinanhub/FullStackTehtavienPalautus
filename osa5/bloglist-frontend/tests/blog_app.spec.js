const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('form')
    const title =  page.getByText('log in to application')
    const usernameInput = page.getByText('username')
    const passwordInput = page.getByText('password')
    const submitButton = page.getByRole('button', { name: 'login' })

    await expect(loginForm).toBeVisible()
    await expect(title).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByText('logout')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'vääräsalasana')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('Uusi testi')
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.waitForTimeout(1000)

      await expect(page.getByText('Uusi testi Test Author').first()).toBeVisible()
    })
  })

})