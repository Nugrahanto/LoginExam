import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaEye);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      if(error.response){
        navigate("/");
      }
    }
  }

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

  const doLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      navigate("/dashboard");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={ doLogin }>
        <div className="Auth-form-content">
          <p className="text-danger">{msg}</p>
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
          <ReCAPTCHA
            sitekey="6LeuXoAhAAAAALagOsXclqWr7nJoeYIR-l3Xii5t"
            onChange={onChange}
          />
          <p className="forgot-password text-right mt-1">
            <small><a href="/forgotpassword">Forgot your password?</a></small>
          </p>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={!verified}>Log In</button>
          </div>
          <p className="forgot-password text-right mt-4 text-center">
            <small>Don't have an account? <a href="/register">Sign Up</a></small>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;