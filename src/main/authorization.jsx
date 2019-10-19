import React, { Component } from 'react'

import { connect } from 'react-redux'

import If from '../common/operator/if'
import NotAuthorized from '../common/template/notAuthorized'

/**
 * Authorizations
 * @class
 * @memberof Main
 */
class Authorization extends Component {
    /**
     * 
     * @param {object} props 
     */
    // eslint-disable-next-line
    constructor(props) {
      super(props)
    }

    /**
     * 
     * @param {string} perfil 
     */
    getPerfil(perfil) {
        switch(perfil) {
            case 0:
                return "administrador"
            case 1:
                return "PJ"
            case 2:
                return "PF"
            default:
        }
    }

    /**
     * 
     * @param {string} tipoUsuario 
     */
    verifyAuthorization(tipoUsuario){
        let type = this.getPerfil(tipoUsuario)

        if(this.props.allowsTo.includes("all"))
            return true
        else if(this.props.allowsTo.includes(type))
            return true
        
        return false
    }

    /**
     * 
     */
    render() {
        return (
            <div className='content-wrapper'>
                <If test={this.verifyAuthorization(null)}>
                    <this.props.component />
                </If>
                
                <If test={!this.verifyAuthorization(null)}>
                    <NotAuthorized />
                </If>
            </div>
        )
    }
}

const mapStateToProps = state => ({user: state.auth.user})
export default connect(mapStateToProps, null)(Authorization)