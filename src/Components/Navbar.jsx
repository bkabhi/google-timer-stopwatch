import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        <NavLink
          to="/timer"
          className={({ isActive }) =>
            isActive ? styles.active : styles.default
          }
        >
          Timer
        </NavLink>
      </h1>
      <h1>
        <NavLink
          to="/stopwatch"
          className={({ isActive }) =>
            isActive ? styles.active : styles.default
          }
        >
          StopWatch
        </NavLink>
      </h1>
    </div>
  );
};

export { Navbar };
