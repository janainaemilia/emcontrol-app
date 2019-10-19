import React from 'react'
import Grid from '../layout/grid'

import DatePicker from 'react-datepicker'
import moment from 'moment'

//https://github.com/Hacker0x01/react-datepicker/issues/543 -- DatePicker Reference --
/**
 * 
 */
export default props => (
    <Grid cols={props.cols} className={props.className}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>

            <DatePicker {...props.input} className={(props.meta.touched && props.meta.error) ? 'form-control error-input' : 'form-control'}
                dateFormat="YYYY-MM-DD"
                readOnly={props.readOnly}
                disabled={props.disabled}
                selected={props.input.value ? moment(props.input.value, 'DD/MM/YYYY') : null}
                placeholderText={props.placeholder}
                showYearDropdown
                onChange={props.change} />
        </div>
    { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
    </Grid>
)