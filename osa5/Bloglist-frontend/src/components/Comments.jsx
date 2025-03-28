import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const Comments = ({ blog }) => {
	const dispatch = useDispatch()
	const [comment, setNewComment] = useState('')
	const handleNewComment = event => setNewComment(event.target.value)

	const addNewComment = event => {
		event.preventDefault()
		const commentObject = {
			id: blog.id,
			comment
		}

		dispatch(commentBlog(commentObject))
		setNewComment('')
	}

	return (
		<div>
			<h3>Comments</h3>
			<form onSubmit={addNewComment}>
				<TextField
					size='small'
					sx={{ marginRight: 1 }}
					value={comment}
					onChange={handleNewComment}
				/>
				<Button variant='contained' type='submit' startIcon={<SendIcon />}>
					Add comment
				</Button>
			</form>
			{blog.comments.length === 0 ? (
				<span>No comments</span>
			) : (
				<List>
					{' '}
					{blog.comments.map((comment, index) => (
						<ListItem key={index}>
							<ListItemText>{comment}</ListItemText>
						</ListItem>
					))}
				</List>
			)}
		</div>
	)
}

Comments.propTypes = {
	blog: PropTypes.object.isRequired
}

export default Comments
