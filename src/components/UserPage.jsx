import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Heading from "./Heading"

const UserPage = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)
  
  if (!user) {
    return null
  }
  return (
    <div>
      <Heading text={user.name} />
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  )
}

export default UserPage