import React from 'react'
import MenuTree from './menuTree'
import MenuItemComponente from './menuItemComponente'

export default props => (
    <section className="sidebar">
        <ul className='sidebar-menu' data-widget="tree">
            {/* <MenuItemComponente className='menuItemComponente' dataName='Instrumentos' label='Instrumentos' icon='cogs' /> */}
            <MenuItemComponente className='menuItemComponente' dataName='Slide' label='Slide' icon='clone' />
            <MenuTree label='Componentes Base' icon='plus-square-o'>
                <MenuItemComponente className='menuItemComponente subItem' dataName='Texto' label='Texto' icon='text-height' />
                <MenuItemComponente className='menuItemComponente subItem' dataName='Imagem' label='Imagem' icon='file-image-o' />
                <MenuItemComponente className='menuItemComponente subItem' dataName='Video' label='Vídeo' icon='video-camera' />
                <MenuTree label='Botões' icon='toggle-on' className='menuItemComponente subItem'>
                    <MenuItemComponente className='menuItemComponente subItem' dataName='BotaoModal' label='Modal' icon='clone' />
                    <MenuItemComponente className='menuItemComponente subItem' dataName='BotaoInstrumento' label='Instrumento' icon='cogs' />
                </MenuTree>
                <MenuTree label='Perguntas' icon='question-circle-o' className='menuItemComponente subItem'>
                    <MenuItemComponente className='menuItemComponente subItem' dataName='PerguntaExata' label='Exata' icon='question' />
                    <MenuItemComponente className='menuItemComponente subItem' dataName='PerguntaVerdadeiroOuFalso' label='Verdadeiro ou Falso' icon='question' />
                    <MenuItemComponente className='menuItemComponente subItem' dataName='PerguntaRange' label='Range' icon='question' />
                    <MenuItemComponente className='menuItemComponente subItem' dataName='PerguntaMultiplaEscolha' label='Multipla Escolha' icon='question' />
                </MenuTree>
            </MenuTree>
            <MenuTree label='Questionários' icon='question'>
                <MenuItemComponente className='menuItemComponente subItem' dataName='QuestionarioSlide' dataTipo={0} label='Verdadeiro Ou Falso ' icon='check-circle' />
                <MenuItemComponente className='menuItemComponente subItem' dataName='QuestionarioSlide' dataTipo={1} label='Multipla Escolha' icon='list-ul' />
            </MenuTree>
            <MenuTree label='Experimentos' icon='flask'>
                <MenuItemComponente className='menuItemComponente' dataName='ExperimentoSlide' label='Add Experimento' icon='plus-circle' />
                <MenuItemComponente className='menuItemComponente' dataName='PassoExperimento' label='Add Novo Passo' icon='edit' />
            </MenuTree>
            {/* <MenuItemComponente className='menuItemComponente' dataName='QuestionarioFinal' label='Questionário Final' icon='check-square-o' />          */}
        </ul>
    </section>
)