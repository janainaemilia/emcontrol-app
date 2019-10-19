import React, { Component } from 'react'

import { connect } from 'react-redux'
import ReactLoading from "react-loading"
import { bindActionCreators } from 'redux'

import If from '../operator/if'
import { getList } from './../../curso/cursoActions'
import { Container, Draggable } from 'react-smooth-dnd'

class SmoothDragAndDrop extends Component {

    constructor(props) {
        super(props)
        this.state = { cursos: [] }
    }
    
    componentWillMount(){
        this.props.getList()
    }

    componentWillReceiveProps(nextProps){
        this.setState({ cursos: nextProps.list.data})
    }

    onDrop(arr, dragResult){
        
        if (dragResult.removedIndex === null && dragResult.addedIndex === null) return arr

		const result = [...arr]
		//let itemToAdd = dragResult.payload
		
		if (dragResult.removedIndex !== null) {
			//itemToAdd = result.splice(dragResult.removedIndex, 1)[0]
		}
		
		if (dragResult.addedIndex !== null) {
			//result.splice(dragResult.addedIndex, 0, itemToAdd)
		}
		
		this.setState({ cursos: result })
    }
    
    render() {
        const cursos = this.state.cursos || []
        
        return (
            <div className="dragDrop aulas">
                <h3>Cursos</h3>
                <Container groupName="1" getChildPayload={i => cursos[i]} onDrop={(e) => this.onDrop(cursos, e)}>
                <If test={cursos.length === 0}>
                    <ReactLoading className="loadingContent" type="spinningBubbles" color="#5b5b5f" />
                </If>
                { cursos.map(curso => {
                    return (
                        <Draggable key={curso.id}>
                            <div className="draggable-item">
                                <div className="aula">
                                    <p className="duracao">{this.props.calcularDuracao(curso.duracao)} <small>DURAÇÃO</small></p>
                                    <p className="nome">{curso.nome}</p>
                                    <button type='button' className='btn' onClick={() => this.props.show(curso.id)}>VER CURSO</button>
                                </div>
                            </div>
                        </Draggable>
                        )
                    }) }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.curso.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SmoothDragAndDrop)