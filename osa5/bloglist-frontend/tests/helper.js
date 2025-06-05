const loginWith = async (page, username, password)  => {
  const loginForm = page.locator('form')
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login').click()
}

export { loginWith }