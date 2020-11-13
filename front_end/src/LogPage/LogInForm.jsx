import React, { Component } from 'react';
import {Button , Form} from 'react-bootstrap';
import axios from 'axios';
// import HomePage from '../Home/HomePage';
// import { useHistory  } from 'react-router-dom';
// import { Router, browserHistory } from 'react-router';

export default class LogInForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            emailErr: '',
            passwordErr:'',
        }
        
    }   
    
    handelChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state)
    }
    handelSubmit =(e)=>{
        e.preventDefault()
        const {email, password} = this.state
         axios.post('http://localhost:9000/auth/login', {email, password })
                .then(res => {
                    console.log("login success")
                    this.setState({
                        email:'',
                        password:'',
                    })
                    console.log(res.data)
                    if(res.data.user){
                        window.location.href='/'

                    }

                })
                .catch(err =>{
                    console.log(err.response.data.errors)
                    this.setState({
                        emailErr : err.response.data.errors.email,
                        passwordErr : err.response.data.errors.password
                    })
                })
    }
    
    render() {
        const { email, password, } = this.state
        return (
            <div>
                <h1> LOG IN </h1>
               <Form onSubmit={this.handelSubmit}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email"
                        onChange={this.handelChange}
                        value={email}
                         placeholder="email" />
                    </Form.Group>
                          <p style={{color:'red'}}>{this.state.emailErr}</p>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password"
                        onChange={this.handelChange}
                        value={password}
                        placeholder="Password" />
                    </Form.Group>
                    <p style={{color:'red'}}>{this.state.passwordErr}</p>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            

        )
    }
}
