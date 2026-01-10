import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import FeedLogo from "../../components/FeedLogo";
import LearningResource from "../../components/visitor/LearningResource";
import apiFacade from "../../apiFacade";
import { searchFilter, sortResources } from "../../utilities";
import styles from "./Feed.module.css";

function Feed() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filter } = useParams(); // :filter from URL
  const { searchQuery } = useOutletContext(); // Get search from Layout
  const [sortOption, setSortOption] = useState("NEWEST");


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
  }, [filter]); // runs on mount and when filter changes

  const getCompareFunction = (option) => {
    switch (option) {
      case "A -> Z":
        return (a, b) => a.title.localeCompare(b.title);

      case "OLDEST":
        return (a, b) => new Date(a.createdAt) - new Date(b.createdAt);

      case "MOST CONTRIBUTIONS":
        return (a, b) => {
          const aContribs =
            a.simpleContributorDTO?.contributions ||
            a.contributorNameDTO?.contributions ||
            0;
          const bContribs =
            b.simpleContributorDTO?.contributions ||
            b.contributorNameDTO?.contributions ||
            0;
          return bContribs - aContribs; // Descending (most first)
        };
      case "NEWEST":
      default:
        return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    }
  };



  // Filter resources based on search query
  const filteredResources = resources.filter(searchFilter(searchQuery));
  const compareResources = sortResources(filteredResources, getCompareFunction(sortOption));







  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
    
  if (error) {
          return <div className={styles.error}>{error}</div>;
  }
    

  return (
    <div className={styles.feedContainer}>
      <FeedLogo />

      <div className={styles.sortContainer}>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
          <option value="A -> Z">A → Z</option>
          <option value="MOST CONTRIBUTIONS">Most Contributions</option>
        </select>
      </div>

      <div className={styles.resourceList}>
        {compareResources.map((resource) => (
          <LearningResource key={resource.learningId} resource={resource} />
        ))}

        {compareResources.length === 0 && (
          <p className={styles.empty}>No resources found.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
