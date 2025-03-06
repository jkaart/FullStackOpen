const { test, expect, beforeEach, describe } = require('@playwright/test')

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
    const usernameInput = page.getByTestId('username')
    const passwordInput = page.getByTestId('password')
    const loginButton = page.getByRole('button', { name: 'Login' })

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()

      const infoDiv = await page.locator('.info')
      await expect(infoDiv).toContainText(`User 'mluukkai' logged in successfully`)

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('eisalainen')
      await page.getByRole('button', { name: 'Login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
    })
  })
})