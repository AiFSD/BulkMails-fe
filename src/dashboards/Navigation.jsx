import React from "react";
import { NavLink, Outlet , useNavigate} from "react-router-dom";
import "../styles/Nav.css";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("authToken"); 

    
    navigate("/login");
  };
  return (
    <div className="dashboard-layout">
      <nav>
        <div className="profile-section">
          <img
            src="https://i.pinimg.com/564x/c5/1c/d4/c51cd448c3f0355d756d4e487aa12232.jpg"
            alt="Logo"
          />
          <h2>O mail G</h2>
          <p>Be The OriGinal</p>
        </div>
        <ul>
          <li>
            <NavLink to="/home"> 🔗 Home</NavLink>
          </li>
          <li>
            <NavLink to="/send-mails">🔗 Send Mails</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">🔗 History</NavLink>
          </li>
          <li>
            <NavLink to="/status">🔗 Status</NavLink>
          </li>
          <li>
            <NavLink to="/track-logs">🔗 Track Logs</NavLink>
          </li>

          <li>
            <NavLink to="/personal">🔗 Personal</NavLink>
          </li>
          <li>
            <NavLink to="/settings">🔗 Settings</NavLink>
          </li>
          <li>
            <NavLink to="/help">🔗 Help</NavLink>
          </li>
          <li>
            <NavLink to="/premium">🔗 Go Premium</NavLink>
          </li>
        </ul>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
