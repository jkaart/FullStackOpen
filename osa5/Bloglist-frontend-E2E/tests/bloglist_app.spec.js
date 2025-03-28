const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
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
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()

      const infoDiv = await page.locator('.info')
      await expect(infoDiv).toContainText(`User 'mluukkai' logged in successfully`)

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('eisalainen')
      await page.getByRole('button', { name: 'Login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByPlaceholder('write blog title').fill('Go To Statement Considered Harmful')
      await page.getByPlaceholder('write blog author').fill('Edsger W. Dijkstra')
      await page.getByPlaceholder('write blog url').fill('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')

      await page.getByRole('button', { name: 'create' }).click()

      const infoDiv = await page.locator('.info')
      await expect(infoDiv).toContainText(`a new blog 'Go To Statement Considered Harmful' added`)

      const createdBlog = await page.locator(`[class='blog']`).first()
      await expect(createdBlog).toContainText('Go To Statement Considered Harmful Edsger W. Dijkstra')
    })

    describe('When there is blog created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()

        await page.getByPlaceholder('write blog title').fill('Go To Statement Considered Harmful')
        await page.getByPlaceholder('write blog author').fill('Edsger W. Dijkstra')
        await page.getByPlaceholder('write blog url').fill('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')

        await page.getByRole('button', { name: 'create' }).click()

        const infoDiv = await page.locator('.info')
        await expect(infoDiv).toContainText(`a new blog 'Go To Statement Considered Harmful' added`)
      })

      test('the blog can be like', async ({ page }) => {
        const createdBlog = await page.locator('.blog').first()

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(createdBlog).toContainText('likes 1')
      })

      test('the blog creator can remove the blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async dialog => {
          await expect(dialog.message()).toContain('Remove blog Go To Statement Considered Harmful by Edsger W. Dijkstra')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        const infoDiv = await page.locator('.info')
        await expect(infoDiv).toContainText('Blog Go To Statement Considered Harmful by Edsger W. Dijkstra removed successfully')
      })

      test('only blog creator can see remove button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'Test User',
            username: 'test',
            password: 'salainen'
          }
        })
        await page.getByRole('button', { name: 'Logout' }).click()
        await page.getByTestId('username').fill('test')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
      })
    })
    
    test('blogs sorted by likes', async ({ page }) => {
      const blogs = [
        {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 5,
        },
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 6,
        },
        {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 8,
        },
      ]

      for (const blog of blogs) {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('write blog title').fill(blog.title)
        await page.getByPlaceholder('write blog author').fill(blog.author)
        await page.getByPlaceholder('write blog url').fill(blog.url)

        await page.getByRole('button', { name: 'create' }).click()
        const createdBlog = await page.getByText(blog.title)
        await createdBlog.getByRole('button', { name: 'view' }).click()

        for (let counter = 1; counter < blog.likes + 1; counter++) {
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByText(`likes ${counter}`).waitFor()
        }
        await page.getByRole('button', { name: 'hide' }).click()
      }

      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'view' }).last().click()
      const firstBlog = await page.locator('.blog').first()
      const lastBlog = await page.locator('.blog').last()

      await expect(firstBlog).toContainText(`likes ${blogs[blogs.length - 1].likes}`)
      await expect(lastBlog).toContainText(`likes ${blogs[0].likes}`)
    })
  })
})