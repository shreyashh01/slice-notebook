import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged In Successfully!", "success")
            Navigate("/");

        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h2 style={{color: "white", padding: "15px", fontSize: "1.6rem"}}>Login here</h2>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" style={{color: "white", padding: "15px", fontSize: "1.2rem"}}>Email address</label>
    <input type="email" className="form-control" value ={credentials.email} onChange={onChange} id="email" name ="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text" style={{color: "wheat"}}>We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label"style={{color: "white", padding: "15px", fontSize: "1.2rem"}}>Password</label>
    <input type="password" className="form-control" value ={credentials.password} onChange={onChange} name = "password" id="password"/>
  </div>
  <button type="submit" className="btn4" style={{margin: "10px"}} >Submit</button>
</form>
      
    </div>
  )
}

export default Login
