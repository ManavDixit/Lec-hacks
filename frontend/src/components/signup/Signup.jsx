import React, { useState,useEffect } from "react";
//importing useNavigate from react-router-dom
import {useNavigate} from 'react-router-dom';
//importing css
import "./Signup.css";

const Login=()=>{
  //intializing useNavigate used to redirect without reloading
  const navigate=useNavigate();
  //useEffect to run when component is mounted
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');//redirecting to home if authToken is not null/undefined (already logged in)
    }
  }// eslint-disable-next-line
  , []);
  //state for userCredintial
  const [userCredintial, setUserCredintial] = useState({name:'',email:'',password:'',confirmPassword:''});
  //funtion to add value of input in state userCredintial when input is changed
  const inputChanged=(event)=>{
      setUserCredintial({...userCredintial,[event.target.name]:event.target.value});
  }
  //function to login user when form is sumbited
  const loginUser=async (event)=>{
    //stoping page from reloading
    event.preventDefault();
      const url=`http://localhost:8000/auth/register`;
      const {name,email,password,confirmPassword}=userCredintial;
      if(password===confirmPassword){
      const data={
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({name,email,password,confirmPassword})
      }
      const response=await fetch(url,data);
      const jsonData=await response.json();
      if(jsonData.success){
        //saving authToken and redirect to home
        localStorage.setItem('token',jsonData.token);
        console.log(jsonData.token);        
        navigate('/');//redirecting to home
      }
      else{
        alert(jsonData.error)
      }
    }
    else{
        alert('Password and confirm password must match')
    }
  }
  return (
    <div id="signup">
      <form onSubmit={loginUser}>
      <div>
        <label htmlFor="user">Name:</label>
        <input type="text" id='user' name='name' onChange={inputChanged} />
      </div>
      <div>
        <label htmlFor="userName">email:</label>
        <input type="text" name="email" id="email" onChange={inputChanged} required minLength='5' />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={inputChanged} required minLength='8'/>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id='confirmPassword' name='confirmPassword' required minLength='8' onChange={inputChanged} />
      </div>
      <button>Create Account</button>
      </form>
    </div>
  );
};

export default Login;