import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import FeedLogo from "../../components/FeedLogo";
import LearningResource from "../../components/visitor/LearningResource";
import apiFacade from "../../apiFacade";
import { searchFilter } from "../../utilities";
import styles from "./Feed.module.css";

function Feed() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filter } = useParams(); // :filter from URL
  const { searchQuery } = useOutletContext(); // Get search from Layout

  // Fetch all resources once when component mounts
  useEffect(() => {
    const loadResources = async () => {
      try {
        let data = "";
        if(filter === "newest") {
          data = await apiFacade.newestFeed();
        } else if(filter === "updated") {
          data = await apiFacade.updatedFeed();
        } else {
          data = await apiFacade.feed();
        }

        setResources(data);
      } catch (err) {
        setError("Failed to load resources");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [filter]); // Run on mount and when filter changes

  // Filter resources based on search query
  const filteredResources = resources.filter(searchFilter(searchQuery));

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
    
  if (error) {
          return <div className={styles.error}>{error}</div>;
  }
    

  return (
    <div className={styles.feedContainer}>
      <FeedLogo />

      <div className={styles.resourceList}>
        {filteredResources.map((resource) => (
          <LearningResource key={resource.learningId} resource={resource} />
        ))}

        {filteredResources.length === 0 && (
          <p className={styles.empty}>No resources found.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
