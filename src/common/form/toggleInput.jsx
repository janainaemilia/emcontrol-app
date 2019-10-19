import React from 'react'
import Grid from '../layout/grid'

import Toggle from 'react-toggle' // http://aaronshaf.github.io/react-toggle/

export default props => (
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
	        <Toggle {...props.input} className='react-toggle-custom'
				icons={props.icons}
				disabled={props.disabled}
				checked={Boolean(props.input.value)}
				onChange={props.input.onChange} />
        </div>
    </Grid>
)