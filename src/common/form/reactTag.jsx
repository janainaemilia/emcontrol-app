import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import '../template/reactTags.css'
import Grid from '../layout/grid'
        
const Keys = {
    TAB: 9,
    COMMA: 188,
    ENTER: 13,
}

export default props => {
    return ( 
        <Grid cols={props.cols} className={props.className}>
            <div className='form-group'>
                <label htmlFor={props.name}>{props.label}</label>
                <ReactTags {...props.input}
                    tags={props.tags}
                    placeholder={'add nova tag'}
                    suggestions={props.suggestions}
                    handleDelete={props.handleDelete}
                    handleAddition={props.handleAddition} 
                    delimiters={[Keys.TAB, Keys.COMMA, Keys.ENTER]}
                    allowUnique={true}
                    classNames={{
                        root: 'ReactTags',
                        tagInput: 'ReactTags__tagInput',
                        tagInputField: 'ReactTags__tagInputField',
                        selected: 'ReactTags__selected',
                        tag: 'ReactTags__tag',
                        tags: (props.meta.touched && props.meta.error) ? 'ReactTags__tags error-input' : 'ReactTags__tags',
                        tagName: 'ReactTags__tagName',
                        suggestions: 'ReactTags__suggestions',
                        isActive: 'is-active',
                        isDisabled: 'is-disabled'
                    }} />
                <label className='tag-help-info'>Para separar as tags digite: vírgula, enter ou tab.</label>
            </div>
        { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
        </Grid>
    )
}