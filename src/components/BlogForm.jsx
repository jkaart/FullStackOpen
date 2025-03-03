const BlogForm = ({ onSubmit, titleValue, authorValue, urlValue, titleOnChange, authorOnChange, urlOnChange }) => (
  <form onSubmit={onSubmit}>
    title <input value={titleValue} onChange={titleOnChange} /><br />
    author <input value={authorValue} onChange={authorOnChange} /><br />
    url <input value={urlValue} onChange={urlOnChange} /><br />
    <button type='submit'>create</button>
  </form>
)

export default BlogForm