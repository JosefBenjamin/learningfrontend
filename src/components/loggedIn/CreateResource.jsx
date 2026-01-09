import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFacade from "../../apiFacade";
import styles from "./CreateResource.module.css";

// Enum values from your Java backend
const FORMAT_CATEGORIES = [
  "BOOK",
  "COURSE",
  "DOCUMENT",
  "GAME",
  "IMAGE",
  "MAGAZINE",
  "MOVIE",
  "MUSIC",
  "PODCAST",
  "SERIES",
  "SOFTWARE",
  "VIDEO",
  "QUOTE",
];

const SUB_CATEGORIES = [
  "ANALYSIS",
  "CHALLENGE",
  "DEEP_DIVE",
  "ENTERTAINMENT",
  "GUIDE",
  "HOW_TO_BUILD",
  "INFOTAINMENT",
  "MINDSET",
  "MOTIVATION",
  "NEWS",
  "PRODUCTIVITY",
  "REVIEW",
  "STORYTELLING",
  "SUMMARY",
  "TUTORIAL",
];

function CreateResource() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { title, link, description, formatCategory, subCategory } =
      e.target.elements;

    const resourceData = {
      learningResourceLink: link.value,
      title: title.value,
      formatCategory: formatCategory.value,
      subCategory: subCategory.value,
      description: description.value,
    };

    try {
      await apiFacade.createResource(resourceData);
      setSuccessMsg("Resource created successfully!");
      e.target.reset();
      // Optionally redirect after a short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setErrorMsg(
        err.fullErrorData?.msg || "Failed to create resource. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createBox}>
      <h3 className={styles.createMsg}>resource.create() {"{"}</h3>
      <p className={styles.createBodyMsg}>Share your knowledge</p>
      <h3 className={styles.createMsg}>{"}"}</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Resource title"
          className={styles.input}
          required
        />

        <input
          type="url"
          name="link"
          placeholder="https://example.com/resource"
          className={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Describe this resource..."
          className={styles.textarea}
          rows={3}
          required
        />

        <select name="formatCategory" className={styles.select} required>
          <option value="">Select format</option>
          {FORMAT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select name="subCategory" className={styles.select} required>
          <option value="">Select category</option>
          {SUB_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Creating..." : "CREATE RESOURCE"}
        </button>
      </form>
    </div>
  );
}

export default CreateResource;
