import logo from "../src/assets/logo.png";
import "../src/styles/Header.css";
import PropTypes from "prop-types";

export default function Header({ children }) {
  return (
    <header>
      <div className="left">
        <img src={logo} alt="Logo" />
        <div className="brandName">
          <h2>FoodShare</h2>
          <p> Saving food and saving environment</p>
        </div>
      </div>
      {children}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
