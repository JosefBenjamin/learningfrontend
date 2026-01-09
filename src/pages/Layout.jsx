import { NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Logo from "../components/Logo.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import CreateResource from "../components/loggedIn/CreateResource.jsx";
import apiFacade from "../apiFacade.js";
import Feed from "./visitor/Feed.jsx";

function Layout() {
  const location = useLocation();
  const isLoggedIn = apiFacade.isLoggedIn();
  

  // Sidebar dynamic rendering
  const renderSidebarContent = () => {
    if (location.pathname === "/login" && !isLoggedIn) {
      return (
        <div className={styles.authContainer}>
          <Login />
        </div>
      );
    }
    if (location.pathname === "/register" && !isLoggedIn) {
      return (
        <div className={styles.authContainer}>
          <Register />
        </div>
      );
    }
    // Show CreateResource form when logged in and on /create path
    if (location.pathname === "/create" && isLoggedIn) {
      return (
        <div className={styles.authContainer}>
          <CreateResource />
        </div>
      );
    }

    // Default: Navigation Links
    return (
      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Feed
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Create Resource
            </NavLink>
            <button
              onClick={() => {
                apiFacade.logout();
                window.location.href = "/";
              }}
              className={styles.link}
            >
              Logout
            </button>
          </>) : ( <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Register
            </NavLink>
          </>
        )}

      </div>
    );
  };

  // Main layout structure
  return (
    <div className={styles.wrapper}>
      {/* The 75% area: We always keep the Feed here unless viewing a resource */}
      <main className={styles.main}>
        <Feed />
      </main>

      {/* The 25% area: This side changes content dynamically */}
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logoLink}>
          <Logo />
        </NavLink>

        {renderSidebarContent()}

        <footer className={styles.footer}>
          <p>© 2026 Datamatiker.Dev</p>
        </footer>
      </nav>
    </div>
  );
}

export default Layout;
