import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'

class UserPanel extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }
    changeOpen() {
        this.setState({ open: !this.state.open })
    }

    renderSwitch(perfil) {
      switch(perfil) {
          case 0:
            return "Administrador"
          case 1:
            return "Moderador de Curso"
          case 2:
            return "Moderador Administrativo"
          case 3:
            return "Desenvolvedor de Curso"
          case 4:
            return "Desenvolvedor de Curso Externo"
          default:
        }
    }

    render() {
        const { nome, tipoUsuario } = this.props.user
        return (
            <div className="user-panel">
                <div className="image">
                  <i className="fa fa-user-circle user-icon"></i>
                </div>
                <div className="info">
                  <p className='info-nome'>{nome}</p>
                  <p className='info-cargo'>{this.renderSwitch(tipoUsuario).toUpperCase()}</p>
                  <a href='/usuarioInfo'><button type='button'><i className="fa fa-pencil"></i></button></a>
                  <button type='button' onClick={this.props.logout}><i className="fa fa-sign-out"></i></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)