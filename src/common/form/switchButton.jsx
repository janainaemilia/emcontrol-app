import React from 'react'
import Grid from '../layout/grid'
import Switch from "react-switch"

export default props => (
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
	        <Switch
                onChange={props.input.onChange}
                checked={Boolean(props.input.value)}
                id="normal-switch"
            />
        </div>
    </Grid>
)