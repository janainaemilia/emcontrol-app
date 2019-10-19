import React from 'react'
import Grid from '../layout/grid'
		
export default props => (   
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            <textarea {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control error-input ' + props.class : 'form-control ' + props.class}
                 required={props.required}
                 readOnly={props.readOnly}
                 disabled={props.disabled}
                 maxLength={props.maxLength}
                 onChange={props.change}
                 placeholder={props.placeholder} />
            <span className='counter'>{props.counter} caracteres restantes</span>
        </div>
    { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
    </Grid>
)
