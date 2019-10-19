import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'
import { initialize } from 'redux-form'

const INITIAL_VALUES = { equipamento: null }

export function signup(values) {
    return submit(values, `${consts.API_URL}/usuario/novo`)
}

export function editar(values) {
    return editarEquipamento(values, `${consts.API_URL}/cliente/editar`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                console.log('usuario', resp.data)
                let tipo = (values['type'].label === 'Pessoa Física') ? 'PF' : 'PJ'

                let cliente = {
                    nome: values['nome'],
                    email: values['email'],
                    endereco: values['endereco'],
                    cidade: values['cidade'],
                    estado: values['estado'],
                    bairro: values['bairro'],
                    tipo: tipo,
                    usuario: resp.data
                }

                axios.post(`${consts.API_URL}/cliente/novo`, cliente)
                    .then(resp => {
                        if(resp != null){
                            console.log('cliente', resp.data)
                            if(tipo === 'PF'){
                                dispatch(addPessoaFisica(values, resp.data))
                            }else{
                                dispatch(addPessoaJuridica(values, resp.data))
                            }
                        }                
                    })
                    .catch(e => {
                        toastr.error('Erro', e)
                    })                
            })
            .catch(e => {
                toastr.error('Erro', e)
            })
    }
}

export function addPessoaFisica(values, cliente){
    let sexo
                
    switch (values['sexo']) {
        case 'Feminino':
            sexo = 'F'
            break;
        case 'Masculino':
            sexo = 'M'
            break
        default:
            sexo = 'I' //indefinido
            break;
    }
    
    let pessoaFisica = {
        cliente: cliente,
        cpf: values['cpf'],
        dataNascimento: values['data-nascimento'],
        sexo: sexo,
        cargo: values['cargo']
    }
    
    return dispatch => {
        axios.post(`${consts.API_URL}/pessoaFisica`, pessoaFisica)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', 'Cadastro realizado com sucesso!')
                    dispatch(init())
                }                
            })
            .catch(e => {
                toastr.error('Erro', e)
            })
    }
}

export function addPessoaJuridica(values, cliente){
    let pessoaJuridica = {
        cliente: cliente,
        cnpj: values['cnpj'],
        razaoSocial: values['razao-social'],
        ramo: values['ramo']
    }

    return dispatch => {
        axios.post(`${consts.API_URL}/pessoaJuridica/novo`, pessoaJuridica)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', 'Cadastro realizado com sucesso!')
                    dispatch(init())
                }                
            })
            .catch(e => {
                toastr.error('Erro', e)
            })
    }
}

function editarEquipamento(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', "Dados atualizados com sucesso!")
                    dispatch({ type: 'CLIENT', payload: resp.data })
                }               
            })
            .catch(e => {
                toastr.error('Erro', e.getMessage())
            })
    }
}

export function buscarCliente(usuario) {
    return dispatch => {
        axios.get(`${consts.API_URL}/cliente/usuario/${usuario.id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'CLIENT', payload: resp.data })
                    dispatch(initialize('EditProfileForm', resp.data))
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function setCliente(values) {
    return [
        initialize('EditProfileForm', values)
    ]
}

export function init() {
    return [
        initialize('addClientForm', INITIAL_VALUES)
    ]
}

//teste conexão com firebase
export function testeFirebase(values, url) {
    return (dispatch, getState, { getFirestore }) => {

        let usuario = {
            login: values['login'],
            senha: values['senha']
        }

        let firestore = getFirestore()
        firestore.collection('usuario').add(usuario)
        .then(() => {
            toastr.error("Sucesso", "Dado add no firebase")
            dispatch(init())
        }).catch(() => {
            toastr.error("Erro", "Tente novamente")
        })
    }
}