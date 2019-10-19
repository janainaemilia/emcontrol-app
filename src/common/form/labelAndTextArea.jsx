import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
		
export default props => (   
    <FormControl margin="normal" required={props.required} fullWidth >
        <TextField {...props.input} label={props.label} type={props.type} multiline={true} rows={1} rowsMax={4} autoFocus value={props.input.value} />
    </FormControl>
)
