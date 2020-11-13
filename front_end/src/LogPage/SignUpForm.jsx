import React, { Component } from 'react';
import {Button , Form} from 'react-bootstrap';
import axios from 'axios';


export default class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
                username :'',
                email:'',
                password:'',
                password2 : '',
                userNameErr:'',
                emailErr: '',
               passwordErr:'',
               passord2Err:'',
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
        this.setState({
            userNameErr:'',
            emailErr: '',
            passwordErr:'',
            passord2Err:'',
        })
        const { username, email, password, password2} = this.state
        if(password2 !== password){
            this.setState({passord2Err : 'password confirmation is incorrect' })
        }else{ 
         axios.post('http://localhost:9000/auth/signup', { username, email, password })
                .then(res =>{
                    console.log(res.data , "hi")
                    this.setState({
                        username :'',
                        email:'',
                        password:'',
                        password2 : '',
                    })

                })
                .catch(err =>{
                    console.log(err.response.data.errors)
                    this.setState({
                        userNameErr : err.response.data.errors.username,
                        emailErr : err.response.data.errors.email,
                        passwordErr : err.response.data.errors.password
                    })
                })
            }
    }
    
    render() {
        const { username, email, password, password2 } = this.state
        return (
            <div>
                <h1> SIGN UP</h1>
               <Form onSubmit={this.handelSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="username" type="text"
                        onChange={this.handelChange}
                        value={username}
                        placeholder="User name" />
                    </Form.Group>
                    <p style={{color:'red'}}>{this.state.userNameErr}</p> 
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label> Password</Form.Label>
                        <Form.Control name="password2" type="password"
                        onChange={this.handelChange}
                        value={password2}
                        placeholder="confirmation Password" />
                    </Form.Group>
                    <p style={{color:'red'}}>{this.state.passord2Err}</p>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            

        )
    }
}
