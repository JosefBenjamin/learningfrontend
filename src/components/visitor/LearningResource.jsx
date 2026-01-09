import styles from "./LearningResource.module.css";

function LearningResource({ resource }) {
  const contributorName =
    resource.simpleContributorDTO?.screenName ||
    resource.simpleContributorDTO?.githubProfile ||
    "Anonymous";

  const getYouTubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/shorts\/([^?]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const youtubeId = getYouTubeId(resource.learningResourceLink);

  return (
    <article className={styles.card}>
      <span className={styles.formatBadge}>{resource.formatCategory}</span>
      <span className={styles.subBadge}>{resource.subCategory}</span>

      <h2 className={styles.title}>{resource.title}</h2>
      <p className={styles.description}>{resource.description}</p>

      {youtubeId && (
        <div className={styles.embedContainer}>
          <iframe
            className={styles.youtubeEmbed}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={resource.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className={styles.meta}>
        <span>By {contributorName}</span>
        <span>•</span>
        <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}

export default LearningResource;
