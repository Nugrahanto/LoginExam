import React, { useState } from 'react'
import axios from "axios";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgSuc, setMsgsuc] = useState('');
  const [type, setType]=useState('password');
  const [icon, setIcon]=useState(FaEye);
  const [verified, setVerified] = useState(false);

  const eyeToggle=()=>{    
    if(type==='password'){
      setIcon(FaEyeSlash);      
      setType('text');
    }
    else{
      setIcon(FaEye);     
      setType('password');
    }
  }

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const doRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
        setMsgsuc("Registration Success");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={ doRegister }>
        <div className="Auth-form-content">
          {msgSuc === "" ? <p className="text-danger">{msg}</p> : <p className="text-success">{msgSuc}</p>}
          <div className="form-group mt-3">
            <label>Username</label>
            <input type="text" placeholder="Username" autoFocus="" className="form-control shadow-none" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email" placeholder="Email" required="" autoFocus="" className="form-control shadow-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <div class="input-group mb-3">
              <input type={type} placeholder="Password" required="" className="form-control shadow-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <span onClick={eyeToggle} class="input-group-text">{icon}</span>
            </div>
          </div>
          <div className="form-group mt-3 mb-3">
            <label>Confirm Password</label>
            <input id="inputConfPassword" type="password" placeholder="Confirm Password" className="form-control shadow-none" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
          </div>
          <ReCAPTCHA
            sitekey="6LeuXoAhAAAAALagOsXclqWr7nJoeYIR-l3Xii5t"
            onChange={onChange}
          />
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={!verified}>Register</button>
          </div>
          <p className="forgot-password text-right mt-4 text-center">
            <small>Already have an account? <a href="/">Log In</a></small>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register;