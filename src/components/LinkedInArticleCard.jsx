import { ArrowUpRight, Linkedin } from 'lucide-react';

function LinkedInArticleCard({ article }) {
  const hasImage = Boolean(article.imageHref);

  return (
    <article className="linkedin-card">
      <div
        className={`linkedin-card-image tone-${article.imageTone}${hasImage ? ' has-photo' : ''}`}
      >
        {hasImage ? (
          <img
            src={article.imageHref}
            referrerPolicy="no-referrer"
            alt={article.imageAlt ?? article.title}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <span>{article.category}</span>
      </div>
      <div className="linkedin-card-copy">
        <p>
          <Linkedin size={16} /> LinkedIn Article
        </p>
        <h3>{article.title}</h3>
        <span>{article.excerpt}</span>
        <a href={article.href} target="_blank" rel="noreferrer">
          Read on LinkedIn <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}

export default LinkedInArticleCard;
