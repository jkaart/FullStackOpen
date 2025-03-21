import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const user = userEvent.setup()
	const createBlog = vi.fn()

	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('write blog title')
	const authorInput = screen.getByPlaceholderText('write blog author')
	const urlInput = screen.getByPlaceholderText('write blog url')
	const createButton = screen.getByText('create')

	await user.type(titleInput, 'Go To Statement Considered Harmful')
	await user.type(authorInput, 'Edsger W. Dijkstra')
	await user.type(
		urlInput,
		'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	)
	await user.click(createButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe(
		'Go To Statement Considered Harmful',
	)
	expect(createBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
	expect(createBlog.mock.calls[0][0].url).toBe(
		'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	)
})
