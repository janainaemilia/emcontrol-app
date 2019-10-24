import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'
import { initialize } from 'redux-form'

const INITIAL_VALUES = { equipamento: null }

export function add(values) {
    return addEquipamento(values, `${consts.API_URL}/equipamento/novo`)
}

export function editar(values){
    return editarEquipamento(values, `${consts.API_URL}/equipamento/editar`)
}

export function addAvaliacao(values) {
    console.log(values)

    return dispatch => {
        axios.post(`${consts.API_URL}/equipamento/avaliar`, values)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', "Avaliação realizadao com sucesso!")
                    dispatch(init())
                }               
            })
            .catch(e => {
                toastr.error('Erro', e.getMessage())
            })
    }
}

function addEquipamento(values, url) {
    // let files = values['files']
    let numeroPatrimonio = values['numero-serie']

    let _categoria = values.categoria
    let _subcategoria = values.subcategoria

    if(_subcategoria != null)
        values.categoria = { id: _subcategoria.value, nome: _subcategoria.label, categoriaPai: values.categoria }
    else
        values.categoria = { id: _categoria.value, nome: _categoria.label }
    
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp != null){
                    let usuario = JSON.parse(localStorage.getItem('emcontrol_user'))
    
                    let equipamentoUsuario = {
                        usuario: usuario,
                        equipamento: resp.data,
                        dataAquisicao: values['data-aquisicao'],
                        numeroPatrimonio: numeroPatrimonio
                    }

                    axios.post(`${consts.API_URL}/equipamento/vincular-usuario`, equipamentoUsuario)
                        .then(resp => {
                            if(resp != null){
                                toastr.success('Sucesso', "Equipamento cadastrado com sucesso!")
                                dispatch({ type: 'EQUIPAMENT', payload: resp.data })
                                dispatch(reload('/meus-equipamentos'))
                                // dispatch(saveImages(files, numeroPatrimonio))
                            }  
                        })
                        .catch(e => {
                            console.log(e)
                        })  
                }                
            })
            .catch(e => {
                toastr.error('Erro', e.getMessage())
            })
    }
}

function editarEquipamento(values, url) {
    let _categoria = values.categoria
    let _subcategoria = values.subcategoria

    if(_subcategoria != null &&  _subcategoria.value != null)
        values.categoria = { id: _subcategoria.value, nome: _subcategoria.label, categoriaPai: values.categoria }
    
    if (_categoria != null && _categoria.value != null)
        values.categoria = { id: _categoria.value, nome: _categoria.label }
    
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp != null){
                    toastr.success('Sucesso', "Equipamento editado com sucesso!")
                    dispatch({ type: 'EQUIPAMENT', payload: resp.data })
                    // dispatch(reload('/meus-equipamentos'))
                }               
            })
            .catch(e => {
                toastr.error('Erro', e.getMessage())
            })
    }
}

export function getCategorias() {
    return dispatch => {
        axios.get(`${consts.API_URL}/categorias`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'CATEGORIA_LIST', payload: modelingData(resp.data) })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getNomes() {
    return dispatch => {
        axios.get(`${consts.API_URL}/nomeEquipamentoList`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'NOMES_LIST', payload: modelingDataNomes(resp.data) })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getSubcategorias() {
    return dispatch => {
        axios.get(`${consts.API_URL}/subcategorias`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'SUBCATEGORIA_LIST', payload: modelingData(resp.data) })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getEquipamentos() {
    return dispatch => {
        axios.get(`${consts.API_URL}/equipamentos`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'ALL_EQUIPAMENT_LIST', payload: resp.data })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function getEquipamentosByUser(usuario) {
    return dispatch => {
        axios.get(`${consts.API_URL}/equipamentos/${usuario.id}`)
            .then(resp => {
                if(resp != null){
                    let list = resp.data
                    // list.map(equipamento => {
                    //     return renderImages(equipamento)
                    // })                    
                    dispatch({ type: 'EQUIPAMENT_LIST', payload: list })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function buscarEquipamento(id) {
    return dispatch => {
        axios.get(`${consts.API_URL}/equipamento/${id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'EQUIPAMENT', payload: resp.data })
                    dispatch(initialize('EditarEquipamentoForm', resp.data))
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function _buscarEquipamento(id) {
    return dispatch => {
        axios.get(`${consts.API_URL}/equipamento/${id}`)
            .then(resp => {
                if(resp != null){
                    dispatch({ type: 'EQUIPAMENT', payload: resp.data })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }
}

function modelingData(list){
    let newList = []
    let _item

    list.forEach(item => {
        if(item.categoriaPai != null)
            _item = { value: item.id, label: item.nome, categvalue: item.categoriaPai }
        else
            _item = { value: item.id, label: item.nome }

        newList.push(_item)
    })

    newList.push({value: 0, label: "Todos", categValue: {id: 0, nome: "Todos"}})

    return newList
}

function modelingDataNomes(list){
    let newList = []
    let _nome

    list.forEach(nome => {
        _nome = { name: nome }
        newList.push(_nome)
    })
    return newList
}

export function saveToServer(imagens){
    return dispatch => {
        axios.post(`${consts.API_URL}/equipamento/vincularImagens`, imagens)
            .then(resp => {
                if(resp){
                    // toastr.success('Sucesso', "Imagens vinculadas a equipamento com sucesso!")
                    dispatch(init())
                }               
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function salvarImagem(imagem){
    return dispatch => {
        axios.post(`${consts.API_URL}/imagem/salvar`, imagem)
            .then(resp => {
                if(resp){
                    dispatch({type: 'CALL_ENGINE', payload: true})
                }               
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function callEngine(nome){
    return dispatch => {
        axios.get(`http://localhost:8000/${nome}`)
            .then(resp => {
                if(resp){
                    let _result = resp.data
                    let _ajust = _result.split(')')

                    let result = []

                    _ajust.forEach(elem => {
                        let values = elem.split('(score=')
                        let key = values[0]
                        let val = parseFloat(values[1]) * 100
                        result.push({ categoria: key, accuracy: val})
                    })

                    let categoria = ''
                    let accuracy = 0.0

                    result.forEach(item => {
                        if(item.accuracy > accuracy){
                            accuracy = item.accuracy
                            categoria = item.categoria
                        }
                    })

                    console.log("categoria", categoria)
                    console.log("accuracy", accuracy)

                    if(accuracy >= 95.0){
                        axios.get(`${consts.API_URL}/equipamentos/categoria/${categoria}`)
                            .then(resp => {
                                if(resp != null){
                                    dispatch({ type: 'ALL_EQUIPAMENT_LIST', payload: resp.data })
                                }                
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }else{
                        toastr.warning('Atenção', "Não foi encontrado nenhum equipamento com essas características.")
                    }
                }               
            })
            .catch(e => {
                console.log(e)
            }) 
    }
}

function reload(path){
    window.location.replace(path)
}

export function init() {
    return [
        initialize('addEquipamentForm', INITIAL_VALUES)
    ]
}

export function setEquipamento(values) {
    return [
        initialize('EditarEquipamentoForm', values)
    ]
}

export function updateMeusEquipamentosList(list){
    return [
        { type: 'EQUIPAMENT_LIST', payload: list }
    ]
}