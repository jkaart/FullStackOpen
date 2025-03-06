import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => setNewTitle(event.target.value)
  const handleNewAuthor = (event) => setNewAuthor(event.target.value)
  const handleNewUrl = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title <input value={newTitle} placeholder='write blog title' onChange={handleNewTitle} /><br />
        author <input value={newAuthor} placeholder='write blog author' onChange={handleNewAuthor} /><br />
        url <input value={newUrl} placeholder='write blog url' onChange={handleNewUrl} /><br />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm