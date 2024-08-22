import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import ansh from "../assets/anshpatel.jpeg";
import "./Sidebar.css"; // Assuming you have the same CSS file

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-details flex items-center">
        <i className="bx bxs-school icon ml-2"></i>
        <div className="logo_name flex items-center mt-1">UniAsk</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <button>
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </button>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <button>
            <i className="bx bx-user"></i>
            <span className="links_name">Profile</span>
          </button>
          <span className="tooltip">Profile</span>
        </li>
        <li>
          <button>
            <i className="bx bx-chat"></i>
            <span className="links_name">Chats</span>
          </button>
          <span className="tooltip">Chats</span>
        </li>
        <li>
          <button>
            <i className="bx bx-heart"></i>
            <span className="links_name">Saved</span>
          </button>
          <span className="tooltip">Saved</span>
        </li>
        <li>
          <button>
            <i className="bx bx-cog"></i>
            <span className="links_name">Setting</span>
          </button>
          <span className="tooltip">Setting</span>
        </li>
        <li className="profile">
          <div className="profile-details">
            <img src={ansh} alt="profileImg" />
            <div className="name_job">
              <div className="name">Ansh Patel</div>
              <div className="job">CSE B2 Student</div>
            </div>
          </div>
          <button>
            <i className="bx bx-log-out" id="log_out"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
