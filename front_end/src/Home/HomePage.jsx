import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
          session:null,
        }
    }
    // fitch the session from back end
    componentDidMount = e => {
        axios.get("http://localhost:9000/sessionUser")
        .then((response)=>{
            const data = response.data.session
            let newSession;
            data && data._id?
            newSession = {
                id: data._id,
                userName: data.username
            } : console.log("no user");
            //*****redirect to another componant*****
            // this.props.history.push('/');
            this.setState({session:newSession})
        }).catch((err)=>{
            console.log(err)
        })
    }
    logOut = e => {
        axios.get("http://localhost:9000/logout").then((response)=>{
            // window.location.href = "/";
            // console.log(this.props.history.push)
            this.props.history.push('/auth2');
          }).catch((err)=>{
            console.log(err)
          })
    }
    render() {
        console.log(this.state)
        const { session } = this.state
        return (
            <div>
                {(session ? <button onClick={this.logOut}>Logout</button> :
                 <Link to='/auth2' >login</Link>)}
                    
                 Hello from home page
                 <h1>Welcome { session && session.userName}</h1>
                 
            </div>
        )
    }
}
