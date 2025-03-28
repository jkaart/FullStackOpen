import Blogs from './Blogs'
import BlogForm from './BlogForm'
import Heading from './Heading'
import { useSelector } from 'react-redux'

const BlogsPage = () => {
	const user = useSelector(state => state.user)
	return (
		<div>
			<Heading text='Blogs' />
			{user.logged ? <BlogForm /> : null}
			<Blogs />
		</div>
	)
}

export default BlogsPage
