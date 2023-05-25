import React from "react";
import { GiWallet } from "react-icons/gi";

const Header = () => {
  return (
    <nav className="main-navigation">
      <div className="custom-container nav-container">
        <div>
          <div className="exp-tracker-logo">
            <h1>Budget Tracker </h1>
            <div>
              <GiWallet />
            </div>
          </div>
        </div>

        <ul className="main-ul">
          <li>
            <a href="##">Home</a>{" "}
          </li>
          <li>
            <a href="##">About</a>{" "}
          </li>
          <li>
            <a href="##">Contact</a>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
