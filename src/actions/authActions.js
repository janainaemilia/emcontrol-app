import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

import { initialize } from 'redux-form'
// import { getFirestore } from 'redux-firestore';
const INITIAL_VALUES = { email: null }

export function login(values) {
    return submit(values, `${consts.API_URL}/validate`)
}

export function recuperarSenha(values) {
    return dispatch => {
        axios.post(`${consts.API_URL}/recuperarSenha`, values)
            .then(resp => {
                if(resp.data){
                    toastr.success("Sucesso", "Um e-mail de recuperação foi enviado para você.")
                    dispatch(init('forgotPasswordForm'))
                }else{
                    toastr.error("Erro", "O e-mail informado não está cadastrado no sistema.")
                }           
            })
            .catch(e => {
                toastr.error('Erro', e)
            })
    }
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp.data !== ''){
                    dispatch({ type: 'USER', payload: resp.data })
                    dispatch(reload('/'))
                }else{
                    toastr.error("Erro", "Login e/ou senha inválidos.")
                }             
            })
            .catch(e => {
                console.log('Erro', e)
            })
    }
}

export function logout() {
    return dispatch => {
        dispatch({ type: 'LOGOUT', payload: false })
    }
}

function reload(path){
    window.location.replace(path)
}

export function init(form) {
    return [
        initialize(form, INITIAL_VALUES)
    ]
}