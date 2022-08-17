import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState('');
  const [msgSuc, setMsgsuc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUsersById();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
    } catch (error) {
      if(error.response){
        navigate("/");
      }
    }
  }

  const getUsersById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setPassword(response.data.password);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setMsgsuc("Password Updated Successfully");
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <h1 className="fw-bold">Edit User</h1>
        <form onSubmit={updateUser}>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">New Password</label>
            <input type="text" placeholder="New Password" autoFocus="" className="form-control shadow-none" id="password" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className="row">
            <div className="col-md-2">
              <a href="/dashboard" type="button" className="btn btn-warning px-4">Back</a>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-2 d-flex flex-row-reverse">    
              <button type="submit" className="btn btn-success px-5">Update</button>
            </div>
          </div>
        </form>
        {msgSuc === "" ? <p className="text-danger">{msg}</p> : <p className="text-success">{msgSuc}</p>}
      </div>
    </div>
  );
};

export default EditUser;
