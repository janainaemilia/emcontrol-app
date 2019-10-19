import React from 'react'

export default props => (
    <li className={'treeview ' + props.className}> 
        <a href={props.path}> 
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
            <i className='fa fa-angle-down pull-right'></i>
        </a>
        <ul className='treeview-menu'>
            {props.children}
        </ul>
    </li>
)