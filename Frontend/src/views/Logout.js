import React from 'react'

import { Redirect } from 'react-router-dom'

export default class Logout extends React.Component{
    state = {
        redirect:null
    }

    componentDidMount(){
        localStorage.removeItem('user')
        this.setState({ redirect: "/" });
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
            <div>
            
            </div>
        )
    }
}