import { useSelector } from 'react-redux'

import LogoutBtn from './LogoutBtn'
import Heading from './Heading'

const Header = () => {
	const user = useSelector(state => state.user)

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
			<span>
				{user.name} logged in <LogoutBtn />
			</span>
		</div>
	)
}

export default Header
