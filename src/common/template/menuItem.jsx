import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MenuItem extends Component {
    constructor(props){
        super(props)
        this.state = { active: false }
    }

    render(){
        return(
            <li className={this.props.class} onClick={this.props.active}> 
                <Link to={this.props.path}>
                    <i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
                </Link>
            </li>
        )
    }
}

export default MenuItem