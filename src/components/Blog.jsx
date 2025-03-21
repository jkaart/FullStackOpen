import { useState } from 'react'
import PropTypes from 'prop-types'
import RemoveBlogBtn from './RemoveBlogBtn'

const Blog = ({ blog, username, editBlog, removeBlog }) => {
	const [visible, setVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const showMoreInfo = () => {
		setVisible(visible ? false : true)
	}

	if (!visible) {
		return (
			<div style={blogStyle} className='blog'>
				{blog.title} {blog.author}{' '}
				<button onClick={showMoreInfo} data-testid='view'>
					view
				</button>
			</div>
		)
	}
	return (
		<div style={blogStyle} className='blog'>
			<span>
				{blog.title} {blog.author}
			</span>{' '}
			<button onClick={showMoreInfo}>hide</button>
			<br />
			<span>{blog.url}</span>
			<br />
			<span>likes {blog.likes}</span>
			<button
				data-testid='like'
				onClick={() => editBlog({ ...blog, likes: blog.likes + 1 })}
			>
				like
			</button>
			<br />
			<span>{blog.user.name}</span>
			<br />
			<RemoveBlogBtn
				loggedUser={username}
				blogUser={blog.user.username}
				onClick={() => removeBlog(blog)}
			/>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	editBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
}

export default Blog
