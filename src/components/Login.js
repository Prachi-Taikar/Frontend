import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState (true)

    let history = useHistory()

    useEffect( () =>{
        if (token ['mytoken' ]){
            history.push('/books')
        }
    }, [token] )

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token))
        .catch(error => console.log(error))
    }

    const RegisterBtn = () => {
        APIService.RegisterUser({username, password})
        .then(resp => loginBtn())
        .catch(error => console.log(error))
    }

    return (
        <div className = "App">
            <h1> Library Management System</h1>
            <br /><br/>
            {isLogin ? <h2>Login Page</h2> : <h2>Registration</h2>}
            <br /><br/>

            <div className ="mb-3">

                <label htmlFor = "username" className = "form-label"> Username :</label>

                <input type = "text" className = "form-control" id = "username" placeholder = "Enter username..."
                value = {username} onChange = {e => setUsername(e.target.value)}></input>

                <label htmlFor = "password" className = "form-label"> password :</label>

                <input type = "password" className = "form-control" id = "password" placeholder = "Enter password..."
                value = {password} onChange = {e => setPassword(e.target.value)}></input>
            
            </div>
                { isLogin ? < button onClick = {loginBtn} className = "btn btn-primary">Login</button> 
                : 
                < button onClick = {RegisterBtn} className = "btn btn-primary">Register</button> }

                <div className = "mb-3">
                    <br />
                    {isLogin ? <h4> If You Don't Have Account, Please &nbsp;
                    <button className = "btn btn-primary" onClick ={() => setLogin(false)}>
                      Register  </button> &nbsp; Here </h4> 

                      : <h4>If You Have Account, Please &nbsp;
                        <button className = "btn btn-primary" onClick ={() => setLogin(true)}>
                      Login  </button>&nbsp; Here </h4>
                      
                      }

                </div>
            
        </div>
    )
}

export default Login
