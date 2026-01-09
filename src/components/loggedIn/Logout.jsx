import apiFacade from "../../apiFacade";
import styles from "./Logout.module.css";

function Logout() {
  const handleLogout = () => {
    apiFacade.logout();
    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Logout
    </button>
  );
}

export default Logout;