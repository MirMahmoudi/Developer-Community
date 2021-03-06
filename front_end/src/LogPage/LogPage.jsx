import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

export default class LogPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:{
                 username : null,
                 email:null,
                 password:null,
             }
        }
    }
    componentDidMount=()=>{
        console.log("did mount")
    }
    render() {
        return (
            <div>
                <h1>Log in and sign up page</h1>
                <SignUpForm />
                <LogInForm />
            </div>
        )
    }
}
