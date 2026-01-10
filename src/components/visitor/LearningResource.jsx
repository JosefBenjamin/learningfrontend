import styles from "./LearningResource.module.css";
import defaultImage from "../../assets/datdevdefault.png";

function LearningResource({ resource }) {
  //For debugging purposes
  console.log("Resource data:", resource);
  console.log("Contributor:", resource.simpleContributorDTO);
  console.log("CreatedAt:", resource.createdAt);


  let contributorName = "Anonymous";
  if(resource.simpleContributorDTO) {
    if(resource.simpleContributorDTO.githubProfile) {
      contributorName = resource.simpleContributorDTO.githubProfile;
  } else if(resource.simpleContributorDTO.screenName) {
      contributorName = resource.simpleContributorDTO.screenName;
    }
  }

  let totalContributions = 0;
  if(resource.simpleContributorDTO) {
    if(resource.simpleContributorDTO.contributions){
      totalContributions = resource.simpleContributorDTO.contributions;
    }
  };


  const getYouTubeId = (url) => {
    if (!url) {
      return null;
    }

    /* patterns is an array of regular expressions (regex),
     that match different YouTube URL formats. 
     Each pattern captures the video ID (the part in parentheses) 
     from URLs like youtube.com/watch?v=ABC123 or youtu.be/ABC123 */
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/shorts\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
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

      {youtubeId ? (
        <div className={styles.embedContainer}>
          <iframe
            className={styles.youtubeEmbed}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={resource.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className={styles.embedContainer}>
          <a
            href={resource.learningResourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resourceLink}
          >
            <img
              src={defaultImage}
              alt={resource.title}
              className={styles.defaultThumbnail}
            />
          </a>
        </div>
      )}

      <div className={styles.meta}>
        <span>
          By {contributorName} who has {totalContributions} contributions.
        </span>
        <span>•</span>
        <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}

export default LearningResource;
