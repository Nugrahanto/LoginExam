import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
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
      const decoded = jwt_decode(response.data.accessToken);
      setID(decoded.userId);
      setUsername(decoded.username);
      setExpire(decoded.exp);
    } catch (error) {
      if(error.response){
        navigate("/");
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="d-flex bd-highlight">
          <div className="p-2 flex-grow-1 bd-highlight">
            <p className="mt-2">Hi, {username}</p>
          </div>
          <div className="p-2 bd-highlight">
            <Link to={`/editUsers/${id}`} className="btn btn-warning mx-2">
              Edit Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
