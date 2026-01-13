import { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import FeedLogo from "../../components/FeedLogo";
import LearningResource from "../../components/visitor/LearningResource";
import apiFacade from "../../apiFacade";
import { searchFilter, sortResources, formatCategory } from "../../utilities";
import styles from "./Feed.module.css";

function Feed() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("NEWEST");

  //seach
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter"); // ?filter=newest or ?filter=updated
  const formatFilter = searchParams.get("format"); // ?format=YOUTUBE
  const subFilter = searchParams.get("sub"); // ?sub=PROGRAMMING
  const { searchQuery, isLoggedIn } = useOutletContext(); // Get search and auth from Layout

  const FORMAT_CATEGORIES = [
    "PDF",
    "YOUTUBE",
    "ARTICLE",
    "EBOOK",
    "PODCAST",
    "GAME",
    "BLOGPOST",
    "OTHER",
  ];

  const SUB_CATEGORIES = [
    "PROGRAMMING",
    "WEB_DEVELOPMENT",
    "DATA_SCIENCE",
    "DATABASES",
    "DEVOPS",
    "ALGORITHMS",
    "SECURITY",
    "MOBILE",
    "DESIGN",
    "CAREER",
  ];

  // Fetch all resources once when component mounts
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError("");
      try {
        let response;
        // Category filters require authentication
        if (formatFilter && isLoggedIn) {
          response = await apiFacade.feedByFormat(formatFilter);
        } else if (subFilter && isLoggedIn) {
          response = await apiFacade.feedBySubCategory(subFilter);
        } else if (filter === "newest") {
          response = await apiFacade.newestFeed();
        } else if (filter === "updated") {
          response = await apiFacade.updatedFeed();
        } else {
          response = await apiFacade.feed();
        }

        // Handle paginated response (has .content) or direct array
        const data = response.content || response;
        setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load resources");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [filter, formatFilter, subFilter, isLoggedIn]); // runs on mount and when filters change

  // Handle filter changes
  const handleFormatChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ format: value });
    } else {
      setSearchParams({});
    }
  };

  const handleSubChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ sub: value });
    } else {
      setSearchParams({});
    }
  };

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
  const compareResources = sortResources(
    filteredResources,
    getCompareFunction(sortOption)
  );

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

        {isLoggedIn && (
          <>
            <select
              value={formatFilter || ""}
              onChange={handleFormatChange}
              className={styles.sortSelect}
            >
              <option value="">All Formats</option>
              {FORMAT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {formatCategory(cat)}
                </option>
              ))}
            </select>

            <select
              value={subFilter || ""}
              onChange={handleSubChange}
              className={styles.sortSelect}
            >
              <option value="">All Categories</option>
              {SUB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {formatCategory(cat)}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className={styles.resourceList}>
        {compareResources.map((resource) => (
          <LearningResource
            key={resource.learningId}
            resource={resource}
          />
        ))}

        {compareResources.length === 0 && (
          <p className={styles.empty}>No resources found.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
