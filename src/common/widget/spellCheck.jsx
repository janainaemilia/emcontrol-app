// eslint-disable-next-line
import axios from 'axios'
import React, { Component } from 'react'

// eslint-disable-next-line
import htmlToDraft from 'html-to-draftjs'
// eslint-disable-next-line
import { EditorState, convertToRaw, Modifier } from 'draft-js'
// eslint-disable-next-line
const URL = 'https://montanaflynn-spellcheck.p.mashape.com/check'

/**
 * SpellCheck
 * @memberof Widget
 * @class
 */
class SpellCheck extends Component {
  /**
   * 
   * @param {object} props 
   */
  constructor(props){
    super(props)
    this.state = { active: false }
    this.addStar = this.addStar.bind(this)
  }

  /**
   * 
   */
  addStar() {
    // eslint-disable-next-line
    const { editorState, onChange } = this.props
    // eslint-disable-next-line
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    )
    //onChange(EditorState.push(editorState, contentState, 'insert-characters'))
    
    let val = !this.state.active
    this.setState({ active: val })
    
    // eslint-disable-next-line
    let text = convertToRaw(editorState.getCurrentContent()).blocks[0].text

    // axios({
    //   method: 'get',
    //   url: `${URL}/?text=${text}`,
    //   headers: { 'X-Mashape-Key': "nFSrodb76WmshbPN6VX2rq7ZoZLqp1XYaUIjsngIMn8xKYQxGD", "Accept": "application/json" }
    // })
    // .then(resp => {
		// 	console.log(resp)
		// })
		// .catch(e => {
		// 	console.log(e)
		// })
  }

  /**
   * 
   */
  render() {
    return (
      <div className='rdw-option-wrapper' onClick={this.addStar}>
        <i className={(this.state.active) ? 'fa fa-keyboard-o spellcheck' : 'fa fa-keyboard-o'}></i>
      </div>
    )
  }
}

export default SpellCheck