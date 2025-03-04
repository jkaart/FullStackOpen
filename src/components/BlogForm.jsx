import { useState } from 'react'

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
        title <input value={newTitle} onChange={handleNewTitle} /><br />
        author <input value={newAuthor} onChange={handleNewAuthor} /><br />
        url <input value={newUrl} onChange={handleNewUrl} /><br />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm