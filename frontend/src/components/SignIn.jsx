import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function SignIn() {
  const [signinData,setsigninData]=useState({'username':'','email':'','password':''})
  const [signinSuccess,setSigninSuccess]=useState(false)
  const Navigate=useNavigate()

  async function handleSignin(){
    if(signinData.password.length<8){
      alert('Password must be atleast 8 characters')
      return
    }
    else if(!signinData.email.includes('@') || !signinData.email.includes('.')){
      alert('Invalid email address')
      return
    }


    try {
     let res = await axios.post(
      "http://localhost:5000/api/auth/signin",
      signinData
    );
    setSigninSuccess(true);
  
    

     console.log(res.data);
    } 
    catch (err) {
     console.error(err);
    }
    
    
    
  };

  return (
    <>
      <div className="center">
       <h1>ViNotes, Open Source Contribution</h1>
       <h1>By Darren Pereira</h1>
       <div className="card">
        
        <h1>Sign In to ViNotes</h1>
        <p>Fill all 3 fields first!</p>
        <label>
         Enter username
         <br/>
         <input 
         value={signinData.username} 
         onChange={(e)=>setsigninData({...signinData,username:e.target.value})}>
         </input>
        </label>
        <label>
         Enter email
         <br/>
         <input value={signinData.email}
         onChange={(e)=>setsigninData({...signinData,email:e.target.value})}>
         </input>
        </label>
        <label>
         Enter password
         <br/>
         <input value={signinData.password}
         onChange={(e)=>setsigninData({...signinData,password:e.target.value})}>
         </input>
        </label>

        {signinData.username!=='' && 
        signinData.email!=='' && 
        signinData.password!=='' && 
        signinSuccess===false &&
        <button onClick={handleSignin}>Sign In</button>}

        {signinSuccess===true && <button onClick={()=>Navigate('/login')}>Login</button>}
       </div>
      </div>
      
    </>
  )
}

export default SignIn
