import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({email: "", password: ""})
    const navigate = useNavigate ()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        // API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credential.email, password: credential.password})
        })
        const json = await response.json()
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showAlert("Logged in Successfully", "success")

        } else {
            props.showAlert("Invalid Credential", "danger")
        }
    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
      }

  return (
    <div className="container mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credential.email}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credential.password}
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
