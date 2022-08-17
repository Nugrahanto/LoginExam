import React, { useState } from 'react'
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [msgSuc, setMsgsuc] = useState('');

  const doForgot = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      await axios.post("http://localhost:5000/forgotPassword", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setMsgsuc("Email has been sent");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={ doForgot }>
        <div className="Auth-form-content">
        {msgSuc === "" ? <p className="text-danger">{msg}</p> : <p className="text-success">{msgSuc}</p>}
          <div className="form-group mt-3">
            <label>Email Address</label>
            <input type="email" placeholder="Email Confirmation" required autoFocus="" className="form-control shadow-none mt-1" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
          <p className="forgot-password text-right mt-4 text-center">
            <small><a href="/">Back to Log In</a></small>
          </p>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;