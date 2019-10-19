import React from 'react'
import Grid from '../layout/grid'

/**
 * 
 */
export default props => (
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>            
            <input {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control error-input' : 'form-control'}
                 max={props.max}
                 min={props.min}
                 type={props.type}
                 required={props.required}
                 readOnly={props.readOnly}
                 disabled={props.disabled}
                 onChange={props.change}
                 maxLength={props.maxLength}
                 placeholder={props.placeholder} />
            <button type='button' onClick={(input) => props.add(props.input)} className='btn btn-primary key-generator'><i className="fa fa-plus"> Add</i></button>
            <p className='counterItemList'>{props.counter} caracteres restantes</p>
        </div>
    { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
    </Grid>
)