import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function add(values) {
    return submit(values, `${consts.API_URL}/manutencao/novo`)
}

export function getManutencaoEquipamento(id) {
    return dispatch => {
        axios.get(`${consts.API_URL}/manutencoes/equipamento/${id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'MANUTENCAO_LIST', payload: resp.data })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getManutencoes() {
    return dispatch => {
        axios.get(`${consts.API_URL}/manutencoes`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'MANUTENCAO_LIST', payload: resp.data })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getManutencoesByUser(usuario) {
    return dispatch => {
        axios.get(`${consts.API_URL}/manutencoes/usuario/${usuario.id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'MANUTENCAO_USUARIO_LIST', payload: resp.data })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getManutencoesByUser2(usuario) {
    return dispatch => {
        axios.get(`${consts.API_URL}/manutencoes/usuario2/${usuario.id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'MANUTENCAO_LIST', payload: resp.data })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function buscarTipoServico() {
    return dispatch => {
        axios.get(`${consts.API_URL}/tipoServicos`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'TIPO_SERVICO_LIST', payload: modelingData(resp.data) })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

function submit(values, url) {
    let _tipoServico = values.tipoServico
    let notaFiscal = values.notaFiscal

    if(notaFiscal != null){
        let _notaFiscal = notaFiscal.split(',')[1]
        values.notaFiscal =  _notaFiscal
    }

    if(_tipoServico != null)
        values.tipoServico = { id: _tipoServico.value, descServico: _tipoServico.label }

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', "Dados da manutenção adicionada com sucesso!")
                    dispatch({ type: 'MANUTENCAO', payload: resp.data })
                    dispatch(reload('/manutencoes/'+values.equipamentoUsuario.equipamento.id))
                }                
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }
}

function reload(path){
    window.location.replace(path)
}

function modelingData(list){
    let newList = []
    let _item

    list.forEach(item => {
        console.log(item)
        _item = { value: item.id, label: item.descServico }
        newList.push(_item)
    })

    return newList
}