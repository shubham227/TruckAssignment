import { Button, Input } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const [Email , setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [tab,selectTab] = useState('login')
    const handleConfirm = async () => {
        let response ;
        {
            tab === 'login' ? 
             response = await fetch('https://reqres.in/api/login',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify( {
                    email: Email,
                    password: Password
                })
            }) : 
            response = await fetch('https://reqres.in/api/register',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify( {
                    email: Email,
                    password: Password
                })
            })
        }
       
        response.json().then((item) => {

            localStorage.setItem('token', item.token);
            history.push('/admin')
        })
    }
return(
    <div>
        <div className="login-conatiner">
        <Button onClick={() => selectTab('login')}>Login</Button>
        <Button onClick={() => selectTab('signup')}>Signup</Button>
        </div>
       
        <span>Email</span> <Input value={Email} onChange={(event) => {
            setEmail(event.target.value);
        }} />
        <span>Password</span> <Input.Password value={Password} onChange={(event) => setPassword(event.target.value)} sec />
        <div>
        <Button onClick={() => handleConfirm()}>{tab === 'login' ? 'Login': 'Signup'}</Button>
            </div>
        
    </div>
)
};

export default Login;