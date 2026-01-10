import apiFacade from "../../apiFacade";
import styles from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

function Logout({ onLoginChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    apiFacade.logout();
    onLoginChange();
    navigate("/");
  };

  return (
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button>
  );
}

export default Logout;