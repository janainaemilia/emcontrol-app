import React from 'react'

export default props => (
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
)
