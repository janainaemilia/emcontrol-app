import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import mountComponent from '../slideComponents/mountComponent'

import { Link } from 'react-router-dom'
import { setCurso, setModal, addNormalSlide, addQuestionarioSlide, addExperimentoSlide, addTexto, addImagem, addVideo, addBotaoModal, 
		 addBotaoInstrumento, addPerguntaExata, addPerguntaVerdadeiroOuFalso, addPerguntaRange, addPerguntaMultiplaEscolha, 
		 addPassoExperimento } from '../../cursoConteudo/cursoConteudoActions'

/**
 * @description Componente para criação de novos componentes
 * @memberof Componentes
 * @class
 */
class MenuItemComponente extends Component {
	/**
	 * 
	 */
	constructor(){
		super()
		this.addComponente = this.addComponente.bind(this)
		this.addSlide = this.addSlide.bind(this)
		this.addPassoExperimento = this.addPassoExperimento.bind(this)
	}
	
	/**
	 * @description Adiciona um novo slide do tipo normal a um conteudo de curso
	 */
	addSlide(){
		let curso = this.props.curso.cursoItem
		let index = (curso.slides.length <= 0) ? 4 : (4 + curso.slides.length)

		let normalSlide = {
			"cursoId": curso.id,
			"tipoSlide": 1,
			"planoDeFundo": "planodefundo.jpg",
			"fundoEscuro": false,
			"index": index,
			_componentes: []
		}

		this.props.addNormalSlide(normalSlide, curso)
	}

	/**
	 * @description Adiciona um novo questionario slide a um conteudo de curso
	 * @param {object} event 
	 */
	addQuestionarioSlide(event){
		let curso = this.props.curso.cursoItem
		let index = (curso.slides.length <= 0) ? 4 : (4 + curso.slides.length)
		let tipoQuestionario = parseInt(event.target.dataset.tipo)

		let questionarioSlide = {
			"cursoId": curso.id,
			"tipoSlide": 2,
			"tipoQuestionario": tipoQuestionario,
			"planoDeFundo": "planodefundo.jpg",
			"fundoEscuro": false,
			"index": index
		}

		this.props.addQuestionarioSlide(questionarioSlide, curso)
	}

	/**
	 * @description Adiciona um novo experimento slide a um conteudo de curso
	 * @param {object} event 
	 */
	addExperimentoSlide(event){
		let curso = this.props.curso.cursoItem
		let index = (curso.slides.length <= 0) ? 4 : (4 + curso.slides.length)

		let experimentoSlide = {
			"cursoId": curso.id,
			"tipoSlide": 3,
			"planoDeFundo": "planodefundo.jpg",
			"fundoEscuro": false,
			"index": index,
			"titulo": "Titulo",
			"descricao": "Descricao"
		}

		this.props.addExperimentoSlide(experimentoSlide, curso)
	}

	/**
	 * @description Adiciona um novo passo de experimento a um experimento slide
	 * @param {string} name 
	 */
	addPassoExperimento(name){
		let curso = this.props.curso.cursoItem
		let id = 1
		let positionY = 100

		for (let s in curso.slides) {
			if (curso.slides[s].show === true) {
				if(curso.slides[s].passos !== null){
					if(curso.slides[s].passos.length > 0){
						let length = curso.slides[s].passos.length
						id = length
						positionY = 100
					}
				}

				let component = mountComponent(name, curso.slides[s], id, positionY)
				this.props.addPassoExperimento(component.props, s, curso)
			}
		}
	}
	
	/**
	 * @description Adiciona uma nova modal a um slide
	 * @param {string} name 
	 * @param {object} curso 
	 * @param {number} id 
	 * @param {number} positionY 
	 */
	addModal(name, curso, id, positionY){
		for (let s in this.props.modal.slides) {
			if(this.props.modal.slides[s].show){
				if(this.props.modal.slides[s].componentes.length > 0){
					let length = this.props.modal.slides[s].componentes.length
					id = length
					positionY = 100
				}
				
				let component = mountComponent(name, this.props.modal.slides[s], id, positionY)
				this.props['add'+name](component.props, s, curso, this.props.modal)
			}
		}
	}

	/**
	 * @description Adiciona um novo componente comum a um slide
	 * @param {string} name 
	 * @param {object} curso 
	 * @param {number} id 
	 * @param {number} positionY 
	 */
	addItemComponent(name, curso, id, positionY){
		for (let s in curso.slides) {
			if (curso.slides[s].show === true) {
				if(curso.slides[s].tipoSlide === "ExperimentoSlide"){
					this.addItemPassoExperimento(name, curso, s, id, positionY)
				}else{
					if(curso.slides[s].componentes.length > 0){
						let length = curso.slides[s].componentes.length
						id = length
						positionY = 100
					}
					
					let component = mountComponent(name, curso.slides[s], id, positionY)
					
					this.props['add'+name](component.props, s, curso)
				}				
			}
		}
	}
	
	/**
	 * @description Adiciona um novo componente comum a um passo de experimento
	 * @param {string} name 
	 * @param {object} curso 
	 * @param {number} s 
	 * @param {number} id 
	 * @param {number} positionY 
	 */
	addItemPassoExperimento(name, curso, s, id, positionY){
		if(curso.slides[s].passos.length > 0){
			for (let p in curso.slides[s].passos) {
				if(curso.slides[s].passos[p].show === true){
					let length = curso.slides[s].passos[p].length
					id = length
					positionY = 10
																	
					let component = mountComponent(name, curso.slides[s], id, positionY, curso.slides[s].passos[p])
					this.props['add'+name](component.props, s, curso, null, p)
				}
			}
		}
	}

	/**
	 * @description Adiciona um novo componente de slide
	 * @param {object} event 
	 */
	addComponente(event){
		event.preventDefault()

		let name = event.target.dataset.name

		switch(name) {
			case 'Slide':
				this.addSlide()
				break
			case 'QuestionarioSlide':
				this.addQuestionarioSlide(event)
				break
			case 'ExperimentoSlide':
				this.addExperimentoSlide(event)
				break
			case "PassoExperimento":
				this.addPassoExperimento(name)
				break
			default:
				let curso = this.props.curso.cursoItem
				let id = 0
				let positionY = 50
				
				if(this.props.modal !== null)
					this.addModal(name, curso, id, positionY)
				else					
					if(curso.slides !== undefined && curso.slides.length >= 1)
						this.addItemComponent(name, curso, id, positionY)
		}
	}

	/**
	 * @description Default react method render
	 */
	render() {
		return (		
			<li className={this.props.className}>
				<Link to='#' data-name={this.props.dataName} data-tipo={this.props.dataTipo} title={this.props.label} onMouseDown={(event) => this.addComponente(event)}>
					<i  data-name={this.props.dataName} data-tipo={this.props.dataTipo} className={`fa fa-${this.props.icon}`}></i> 
					<span data-name={this.props.dataName} data-tipo={this.props.dataTipo}>{this.props.label}</span>	
				</Link>	        
		    </li>
		) 
	}
}

const mapStateToProps = state => ({ curso: state.curso, modal: state.curso.modal })
const mapDispatchToProps = dispatch => bindActionCreators({ setCurso, setModal, addNormalSlide, addQuestionarioSlide, addExperimentoSlide, addTexto, addImagem, addVideo, addBotaoModal, 
															addBotaoInstrumento, addPerguntaExata, addPerguntaVerdadeiroOuFalso, 
															addPerguntaRange, addPerguntaMultiplaEscolha, addPassoExperimento }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MenuItemComponente)