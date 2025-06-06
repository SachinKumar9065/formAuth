import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import {ToastContainer} from 'react-toastify'

const Home = () => {

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
      setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) =>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess("User Loggedout")

    setTimeout(()=>{
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async ()=>{
    try {
      const url = "https://form-auth-api.vercel.app/product";
      const headers = {
        headers : {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result)
      
    } catch (error) {
      handleError(error);
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products.map((item, index)=>{
            return (
              <ul key={index}>
                <span>{item.name} : {item.price}</span>
              </ul>
            )
          })
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
