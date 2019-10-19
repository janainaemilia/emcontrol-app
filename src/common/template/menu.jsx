import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

import If from '../operator/if'

/**
 * @description Menu
 * @class
 * @namespace Menu
 */
class Menu extends Component {
    constructor(props){
        super(props)
        this.state = { active: null }
        this.setAsActive = this.setAsActive.bind(this)
    }
    
    /**
     * @param {string} perfil 
     */
    getPerfil(perfil) {
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

    /**
     * @param {string} path 
     */
    setAsActive(path){
        this.setState({ active: path })
    }

    /**
     * @description Default react method render
     */
    render(){
        const { tipoUsuario } = this.props.user

        return(
            <ul className='sidebar-menu' data-widget="tree">                
                <MenuItem path='/' label='Dashboard' icon='dashboard' active={() => this.setAsActive('/')} class={(this.state.active === '/') ? 'menu-item-active' : ''} />  

                <If test={this.getPerfil(tipoUsuario) === "Administrador"}>
                    <MenuTree label='Usuários' icon='user'>
                        <MenuItem path='/usuario' label='Lista' icon='list-alt' active={() => this.setAsActive('/usuario')} class={(this.state.active === '/usuario') ? 'menu-item-active' : ''} />
                        <MenuItem path='/solicitacao' label='Solicitações' icon='tasks' active={() => this.setAsActive('/solicitacao')} class={(this.state.active === '/solicitacao') ? 'menu-item-active' : ''} />
                    </MenuTree>
                </If>

                <If test={this.getPerfil(tipoUsuario) === "Moderador de Curso" || this.getPerfil(tipoUsuario) === "Administrador"}>
                    <MenuItem path='/areaTecnologica' label='Área Tecnológica' icon='circle-o-notch' active={() => this.setAsActive('/areaTecnologica')} class={(this.state.active === '/areaTecnologica') ? 'menu-item-active' : ''} />
                    <MenuItem path='/segmentoTecnologico' label='Segmento Tecnológico' icon='circle-o-notch' active={() => this.setAsActive('/segmentoTecnologico')} class={(this.state.active === '/segmentoTecnologico') ? 'menu-item-active' : ''} />
                    <MenuItem path='/areaDeConhecimento' label='Áreas de Conhecimento' icon='graduation-cap' active={() => this.setAsActive('/areaDeConhecimento')} class={(this.state.active === '/areaDeConhecimento') ? 'menu-item-active' : ''} />
                    <MenuTree label='Instrumentos' icon='wrench'>
                        <MenuItem path='/instrumento' label='Lista' icon='list-alt' active={() => this.setAsActive('/instrumento')} class={(this.state.active === '/instrumento') ? 'menu-item-active' : ''} />
                        <MenuItem path='/categoriaInstrumento' label='Categorias' icon='history' active={() => this.setAsActive('/categoriaInstrumento')} class={(this.state.active === '/categoriaInstrumento') ? 'menu-item-active' : ''} />
                    </MenuTree>
                    <MenuItem path='/experimento' label='Experimentos' icon='flask' active={() => this.setAsActive('/experimento')} class={(this.state.active === '/experimento') ? 'menu-item-active' : ''} />
                    <MenuItem path='/curso' label='Cursos' icon='list-alt' active={() => this.setAsActive('/curso')} class={(this.state.active === '/curso') ? 'menu-item-active' : ''}  />
                </If>

                <If test={this.getPerfil(tipoUsuario) === "Desenvolvedor de Curso" || this.getPerfil(tipoUsuario) === "Desenvolvedor de Curso Externo"}>
                    <MenuItem path='/curso' label='Cursos' icon='list-alt' active={() => this.setAsActive('/curso')} class={(this.state.active === '/curso') ? 'menu-item-active' : ''} />
                </If>

                <If test={this.getPerfil(tipoUsuario) === "Moderador Administrativo" || this.getPerfil(tipoUsuario) === "Administrador"}>
                    <MenuItem path='/cliente' label='Cliente' icon='users' active={() => this.setAsActive('/cliente')} class={(this.state.active === '/cliente') ? 'menu-item-active' : ''} />
                    <MenuTree label='E.D.I' icon='mobile'>
                        <MenuItem path='/edi' label='Lista' icon='list-alt' active={() => this.setAsActive('/edi')} class={(this.state.active === '/edi') ? 'menu-item-active' : ''} />
                        <MenuItem path='/versaoEdi' label='Versões' icon='history' active={() => this.setAsActive('/versaoEdi')} class={(this.state.active === '/versaoEdi') ? 'menu-item-active' : ''} />
                    </MenuTree>
                    <MenuItem path='/venda' label='Vendas' icon='briefcase' active={() => this.setAsActive('/venda')} class={(this.state.active === '/venda') ? 'menu-item-active' : ''} />
                    <MenuItem path='/licenca' label='Licenças' icon='certificate' active={() => this.setAsActive('/licenca')} class={(this.state.active === '/licenca') ? 'menu-item-active' : ''} />
                    <MenuItem path='/relatorio' label='Relatórios' icon='bar-chart' active={() => this.setAsActive('/relatorio')} class={(this.state.active === '/relatorio') ? 'menu-item-active' : ''} />
                </If>

                <MenuItem path='/chat' label='Chat' icon='comments' active={() => this.setAsActive('/chat')} class={(this.state.active === '/chat') ? 'menu-item-active' : ''} />
            </ul>        
        )
    }
}

const mapStateToProps = state => ({user: state.auth.user})
export default connect(mapStateToProps, null)(Menu)