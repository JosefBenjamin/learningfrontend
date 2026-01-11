import { useState } from "react";
import apiFacade from "../../apiFacade";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login({ onLoginChange }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setLoading(true);
    setErrorMsg("");

    // Extracting data from the form fields
    const { username, password } = e.target.elements;

    try {
      await apiFacade.login(username.value, password.value);
      console.log("Login successful, token stored");
      onLoginChange();
      console.log("onLoginChange completed");
      navigate("/");
      console.log("navigate completed");
    } catch (err) {
      console.error("Error caught:", err);
      setErrorMsg(err.fullErrorData?.msg || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBox}>
      <h3 className={styles.loginMsg}>if(user.exists) {"{"} </h3>
      <p className={styles.loginBodyMsg}>Enter valid credentials</p>
      <h3 className={styles.loginMsg}>{"}"}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            className={styles.input}
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={styles.input}
            required
          />
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Looking for token..." : "GET JWT TOKEN"}
        </button>
      </form>
    </div>
  );
}

export default Login;
