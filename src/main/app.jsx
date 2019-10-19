import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from '../common/template/header'
import Messages from '../common/msg/messages'

import Routes from './routes'

/**
 * @namespace Main
 */
export default props => (
    <BrowserRouter>
        <div className='wrapper'>            
            <Header />
            <Routes />
            <Messages />
        </div>
    </BrowserRouter>
)