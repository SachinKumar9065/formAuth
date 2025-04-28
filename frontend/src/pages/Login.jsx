import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { handleSuccess, handleError } from '../Utils'

const Login = () => {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name, value);
        setLoginInfo({...loginInfo, [name]:value});
    }
 

    const handleLogin = async (e) =>{
        e.preventDefault();

        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError("email and password is required")
        }

        try {
            const url = "https://form-auth-api.vercel.app/api/login";
            const response = await fetch(url, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();

            const {success, message, jwtToken, name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)

                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    }


  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleChange} id='email' name='email' placeholder='Enter your Email' value={loginInfo.email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handleChange} id='password' name='password' placeholder='Enter your Password' value={loginInfo.password} />
            </div>
            <button type='submit' >Login</button>

            <span>Does't have an account ?
                <Link to="/signup" >Signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login
