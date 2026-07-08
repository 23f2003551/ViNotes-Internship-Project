import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Login() {
 const [loginData,setLoginData]=useState({'username':'',
    'email':'','password':''
 })
 const navigate=useNavigate()

  async function handleLogin(){
    if(loginData.password.length<8){
      alert('Password must be atleast 8 characters')
      return
    }
    else if(!loginData.email.includes('@') || !loginData.email.includes('.')){
      alert('Invalid email address')
      return
    }
    try {
     const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      loginData
     );
     localStorage.setItem("username",res.data.username)
     navigate('/home')
     console.log(res.data);

   } 
   catch (err) {
     console.error(err);
     alert(err.response.data.message)
  }

}

  return (
    <>
      <div className="center">
       <h1>ViNotes, Open Source Contribution</h1>
       <h1>By Darren Pereira</h1> 
       <div className="card">
        
        <h1>Login Page</h1>
        <p>Fill all fields with correct credintials</p>
        <label>
         Enter username
         <br/>
         <input 
         value={loginData.username} 
         onChange={(e)=>setLoginData({...loginData,username:e.target.value})}>
         </input>
        </label>
        <label>
         Enter email
         <br/>
         <input value={loginData.email}
         onChange={(e)=>setLoginData({...loginData,email:e.target.value})}>
         </input>
        </label>
        <label>
         Enter password
         <br/>
         <input value={loginData.password}
         onChange={(e)=>setLoginData({...loginData,password:e.target.value})}>
         </input>
        </label>
        {loginData.username!=='' &&
        loginData.email!=='' &&
        loginData.password!=='' &&
        <button onClick={handleLogin}>Login</button>}
       </div>
      </div>
      
    </>
  )
}

export default Login
