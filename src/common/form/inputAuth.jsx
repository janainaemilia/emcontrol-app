import React from 'react'

/**
 * 
 */
export default props => (
	<div className="form-group form-input">
		<input {...props.input}
			className={'form-control'}
			placeholder={props.placeholder}
			readOnly={props.readOnly}
			type={props.type} />
	</div>
)