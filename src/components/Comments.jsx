import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { useState } from 'react'

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
				<input value={comment} onChange={handleNewComment} />
				<button type='submit'>Add comment</button>
			</form>
			<ul>
				{blog.comments.map((comment, index) => (
					<li key={index}>{comment}</li>
				))}
			</ul>
		</div>
	)
}

Comments.propTypes = {
	blog: PropTypes.object.isRequired
}

export default Comments
