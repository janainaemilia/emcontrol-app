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
            <input {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control error-input ' + props.class : 'form-control ' + props.class}
                 max={props.max}
                 min={props.min}
                 type={props.type}
                 required={props.required}
                 readOnly={props.readOnly}
                 disabled={props.disabled}
                 maxLength={props.maxLength}
                 onChange={props.change}
                 placeholder={props.placeholder} />
            <If test={props.senhaField}>
                <button type='button' onClick={props.onClick} className='btn btn-primary key-generator'><i className="fa fa-refresh"> {props.senhaFieldLabel}</i></button>
            </If>
        </div>
    { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
    </Grid>
)
