import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Heading from "./Heading"

const UsersPage = () => {
  const users = useSelector(state => state.users)
  console.log('users', users)
  return (
    <div>
      <Heading text='Users' />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage