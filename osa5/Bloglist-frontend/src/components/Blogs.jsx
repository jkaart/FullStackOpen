import { useDispatch, useSelector } from 'react-redux'
import Blog from './BlogPage'
import { Link } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'

const Blogs = () => {
	const blogs = useSelector(state => state.blogs)

	return (
		<List>
			{blogs.map(blog => (
				<ListItemButton disableGutters key={blog.id} to={`/blogs/${blog.id}`}>
					<ListItemText primary={`${blog.title} ${blog.author}`} />
				</ListItemButton>
			))}
		</List>
	)
}

export default Blogs
