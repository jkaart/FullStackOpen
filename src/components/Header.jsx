import { useSelector } from 'react-redux'

import LogoutBtn from './LogoutBtn'
import Heading from './Heading'
import { Link } from 'react-router-dom'

const Header = () => {
	const user = useSelector(state => state.user)

	const padding = {
		padding: 5
	}

	if (!user.logged) {
		return (
			<div>
				<Heading text='Log in to application' />
			</div>
		)
	}
	return (
		<div>
			<Heading text='Blogs' />
		</div>
	)
}

export default Header
