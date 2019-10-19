import React from 'react'
import Grid from '../layout/grid'
import If from '../operator/if'

/**
 * 
 */
export default props => {
    const optionsList = props.options|| []
    
    return (
        <Grid cols={props.cols}>
            <div className='form-group'>
                <label htmlFor={props.name}>{props.label}</label>
                <select {...props.input} disabled={props.disabled} className={(props.meta.touched && props.meta.error) ? 'form-control error-input' : 'form-control'} readOnly={props.readOnly} onChange={props.change}>
                    <option value="-">-- Escolha uma opção --</option>
                    { optionsList.map(item => <option key={(item.cnpj) ? item.cnpj : item.id} value={item.id}>{(item.nome) ? item.nome : item[props.target] }</option>) }
                </select>
            </div>
            { props.meta.touched && props.meta.error && <div className={(props.meta.touched && props.meta.error) ? 'error-message error-message-key' : 'error-message'}> <span>{props.meta.error}</span> </div> }
        </Grid>
    )
}