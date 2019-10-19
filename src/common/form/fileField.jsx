import React from 'react'
import Grid from '../layout/grid'
import If from '../operator/if'

/**
 * 
 */
export default props => (   
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            <input type='hidden' disabled {...input} />
        </div>
    </Grid>
)