import { NavLink, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Layout.module.css";
import Logo from "../components/Logo.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import CreateResource from "../components/loggedIn/CreateResource.jsx";
import Logout from "../components/loggedIn/Logout.jsx";

// Now receives isLoggedIn and onLoginChange as props
function Layout({ isLoggedIn, onLoginChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // redirection
  useEffect(() => {
    if (location.pathname === "/create" && !isLoggedIn) {
      navigate("/login");
    }
  }, [location.pathname, isLoggedIn, navigate]);

  // feed page (where search makes sense)
  const isOnFeed = location.pathname === "/" || location.pathname.startsWith("/feed");

  // Sidebar dynamic rendering function
  const renderSidebarContent = () => {
    if (location.pathname === "/login" && !isLoggedIn) {
      return (
        <div className={styles.authContainer}>
          <Login onLoginChange={onLoginChange} />
        </div>
      );
    }
    if (location.pathname === "/register" && !isLoggedIn) {
      return (
        <div className={styles.authContainer}>
          <Register onLoginChange={onLoginChange} />
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
            <Logout onLoginChange={onLoginChange} /> 
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
      <main className={styles.main}>
        <Outlet context={{ searchQuery, isLoggedIn }} />
      </main>

      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logoLink}>
          <Logo />
        </NavLink>

        {isOnFeed && (
          <input
            type="text"
            placeholder="Search learning resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        )}

        {renderSidebarContent()}

        <footer className={styles.footer}>
          <p>© 2026 Datamatiker.Dev</p>
        </footer>
      </nav>
    </div>
  );
}

export default Layout;
