import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

/**
 * 
 */
export default props => (
    <FormControl margin="normal" required={props.required} fullWidth >
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        <Input {...props.input} type={props.type} autoComplete={props.name} readOnly={props.readOnly} autoFocus value={props.input.value} />
    </FormControl>
)