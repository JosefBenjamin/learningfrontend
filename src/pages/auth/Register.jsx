import { useState } from "react";
import apiFacade from "../../apiFacade";
import styles from "./Register.module.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setLoading(true);
    setErrorMsg("");

    const { username, githubProfile, screenName, password, confirmPassword } =
      e.target.elements;

    if (password.value !== confirmPassword.value) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await apiFacade.register(
        username.value,
        screenName.value || null, 
        githubProfile.value || null,
        password.value
      );
      window.location.href = "/";
    } catch (err) {
      setErrorMsg(err.fullErrorData?.msg || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerBox}>
      <h3 className={styles.registerMsg}>if(user.notExists) {"{"} </h3>
      <p className={styles.registerBodyMsg}>Create an account</p>
      <h3 className={styles.registerMsg}>{"}"}</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="username"
          className={styles.input}
          required
        />
        <input
          type="text"
          name="screenName"
          placeholder="screen name (or use GitHub)"
          className={styles.input}
        />
        <input
          type="text"
          name="githubProfile"
          placeholder="GitHub handle (or use screen name)"
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className={styles.input}
          required
        />

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Registering..." : "REGISTER"}
        </button>
      </form>
    </div>
  );
}

export default Register;
