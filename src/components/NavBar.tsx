// src/components/NavBar.tsx
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/list"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        List
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Gallery
      </NavLink>
    </nav>
  );
}

export default NavBar;