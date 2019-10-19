import React from 'react'
import Menu from './menu'
import UserPanel from './userPanel'

export default props => (
    <aside className='main-sidebar'>
        <section className='sidebar'>
			<UserPanel />
            <Menu />
        </section>
    </aside>
)