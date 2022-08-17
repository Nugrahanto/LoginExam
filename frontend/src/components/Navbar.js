import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async() => {
    try {
      await axios.delete("http://localhost:5000/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">
          <img src="https://cdn-icons-png.flaticon.com/512/207/207190.png" alt="" width="30" height="24" className="d-inline-block align-text-top ms-2"/>
          <span className="ms-2">Login Exam</span>
        </a>
        <div className="d-flex me-2">
          <button onClick={ Logout } className="btn btn-primary px-4">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar