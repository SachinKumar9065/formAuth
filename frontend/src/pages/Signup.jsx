import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { handleSuccess, handleError } from '../Utils'

const Signup = () => {

    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name, value);
        setSignupInfo({...signupInfo, [name]:value});
    }
 

    const handleSignup = async (e) =>{
        e.preventDefault();

        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError("name, email and password is required")
        }

        try {
            const url = "http://localhost:1000/api/signup";
            const response = await fetch(url, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result=await response.json();

            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" onChange={handleChange} id='name' name='name' autoFocus placeholder='Enter your name' value={signupInfo.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleChange} id='email' name='email' placeholder='Enter your Email' value={signupInfo.email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handleChange} id='password' name='password' placeholder='Enter your Password' value={signupInfo.password} />
            </div>
            <button type='submit' >Signup</button>

            <span>Already have an account ?
                <Link to="/login" >Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup