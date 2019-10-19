import React from 'react'
import AsyncSelect from 'react-select/lib/Async'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

export default props => (
    <FormControl margin="normal" required fullWidth className={props.typeClass}>
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        <AsyncSelect
            cacheOptions
            value={props.actualValue}
            // noOptionsMessage={this.noOptionsMessage}
            // getOptionValue={this.getOptionValue}
            // getOptionLabel={this.getOptionLabel}
            // defaultOptions={defaultOptions}
            loadOptions={() => props.handleValues()}
            placeholder={props.placeholder}
            onChange={props.change}
        />
    </FormControl>
)
