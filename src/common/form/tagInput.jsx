import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import Grid from '../layout/grid'
        
export default props => {
    return ( 
        <Grid cols={props.cols} className={props.className}>
            <div className='form-group'>
                <label htmlFor={props.name}>{props.label}</label>
                <TagsInput  {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control tagField error-input' : 'form-control tagField'} 
                    value={props.tags}
                    tagProps={{
                        className: 'react-tagsinput-tag tag-input', 
                        classNameRemove: 'react-tagsinput-remove tag-input-remove'
                    }}
                    inputProps={{
                        name:`${props.input.name}`,
                        className: 'react-tagsinput-input',
                        placeholder: 'Ex.: elétrica, eletrônica (somente letras minúsculas)'
                    }}
                    validationRegex={/[a-z\u00C0-\u00DC]+/}
                    onlyUnique={true}
                    onChange={props.handleChange} />
            </div>
        { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
        </Grid>
    )
}