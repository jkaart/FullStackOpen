import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<>
			<div style={hideWhenVisible}>
				<Button variant='contained' onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<Grid padding={1}>
				<div style={showWhenVisible}>
					{props.children}
					<Button variant='contained' onClick={toggleVisibility}>
						cancel
					</Button>
				</div>
			</Grid>
		</>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
