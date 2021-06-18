import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class Logout extends Component {
    componentDidMount(){
        console.log("logout:")
        sessionStorage.clear()
        window.location.reload(false)

        
    }
    render() {
        return (
            <div>
                Logout page
                <Redirect to='/Login'/>
            </div>
        )
    }
}

export default Logout
