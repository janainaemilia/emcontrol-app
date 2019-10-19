import React from 'react'
import Select from 'react-select'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

export default props => (
    <FormControl margin="normal" required fullWidth className={props.typeClass}>
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        <Select { ...props.input }
            className={props.className}
            value={props.actualValue}
            onChange={props.change}
            onBlur={(e) => e.preventDefault()}
            options={props.options}
            placeholder={props.placeholder}
        />
    </FormControl>
)
