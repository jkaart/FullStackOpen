import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

test('renders blog title', () => {
	const blog = {
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	}
	render(<Blog blog={blog} />)

	const element = screen.getByText('Go To Statement Considered Harmful', {
		exact: false,
	})

	expect(element).toBeDefined()
})
describe('user click event', () => {
	let blog
	let user

	beforeEach(() => {
		blog = {
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			user: {
				username: 'jaska',
				name: 'Jaska Jokunen',
			},
		}
		user = userEvent.setup()
	})

	test('render url, likes and user name if view button clicked', async () => {
		render(<Blog blog={blog} />)
		const button = screen.getByTestId('view')

		await user.click(button)

		const blogUrl = screen.getByText(
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			{ exact: false },
		)

		const blogLikes = screen.getByText(5, { exact: false })
		const blogUser = screen.getByText('Jaska Jokunen', { exact: false })

		expect(blogLikes).toBeDefined()
		expect(blogUrl).toBeDefined()
		expect(blogUser).toBeDefined()
	})

	test('expect 2 event handler calls if like button click 2 times', async () => {
		const mockHandler = vi.fn()

		render(<Blog blog={blog} editBlog={mockHandler} />)
		const viewButton = screen.getByTestId('view')

		await user.click(viewButton)

		const likeButton = screen.getByTestId('like')

		await user.click(likeButton)
		await user.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
