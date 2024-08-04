import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setCredential] = useState({uname: "", email: "", password: "", cpassword: ""})
    const navigate = useNavigate ()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        // API Call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credential.uname, email: credential.email, password: credential.password})
        })
        const json = await response.json()
        console.log(json);
        
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showAlert("Account Created Successfully", "success")
        } else {
          props.showAlert("Invalid Credential", "danger")
        }
    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
      }

  return (
    <div className="container mt-3">
      <h2>Signup to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="uname" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={credential.uname}
            className="form-control"
            id="uname"
            name="uname"
            aria-describedby="unameHelp"
            onChange={onChange}
            required
          />
        </div>
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
            required
          />
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={credential.cpassword}
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
