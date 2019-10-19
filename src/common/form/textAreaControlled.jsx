import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <textarea {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control error-input ' + props.class : 'form-control ' + props.class}
                 max={props.max}
                 min={props.min}
                 type={props.type}
                 required={props.required}
                 readOnly={props.readOnly}
                 disabled={props.disabled}
                 maxLength={props.maxLength}
                 onChange={props.change}
                 placeholder={props.placeholder} >
            </textarea>
        </div>
    { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
    </Grid>
)
