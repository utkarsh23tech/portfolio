import { ArrowUpRight, Linkedin } from 'lucide-react';
import logo from '../assets/unnati-chauhan-logo.png';

function LinkedInArticleCard({ article }) {
  return (
    <article className="linkedin-card">
      <div className={`linkedin-card-image tone-${article.imageTone}`}>
        <img src={logo} alt="" />
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
