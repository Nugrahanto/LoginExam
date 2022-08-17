import React, { useState } from 'react'
import axios from "axios";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgSuc, setMsgsuc] = useState('');
  const [type, setType]=useState('password');
  const [icon, setIcon]=useState(FaEye);

  const doReset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    try {
      await axios.patch("http://localhost:5000/resetPassword", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setMsgsuc("Password Reset Successfully");
    } catch (error) {
      setMsg(error.response.data.msg);
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

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={ doReset }>
        <div className="Auth-form-content">
        {msgSuc === "" ? <p className="text-danger">{msg}</p> : <p className="text-success">{msgSuc}</p>}
          <div className="form-group mt-3">
            <label>New Password</label>
            <div class="input-group mb-3">
              <input type={type} placeholder="New Password" required="" className="form-control shadow-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <span onClick={eyeToggle} class="input-group-text">{icon}</span>
            </div>
          </div>
          <div className="form-group mt-3">
            <label>Confirm New Password</label>
            <input id="inputConfPassword" type="password" placeholder="Confirm New Password" className="form-control shadow-none" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword;