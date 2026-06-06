import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { linkedinArticles } from '../data/linkedinArticles';
import LinkedInArticleCard from './LinkedInArticleCard';
import './LinkedInArticlesCarousel.css';

function getCardsPerView() {
  if (window.innerWidth <= 620) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function LinkedInArticlesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  const maxIndex = Math.max(linkedinArticles.length - cardsPerView, 0);

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView());

    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const currentArticles = useMemo(
    () => linkedinArticles.slice(activeIndex, activeIndex + cardsPerView),
    [activeIndex, cardsPerView],
  );

  const previous = () => setActiveIndex((index) => Math.max(index - 1, 0));
  const next = () => setActiveIndex((index) => Math.min(index + 1, maxIndex));

  return (
    <section className="linkedin-section" aria-labelledby="linkedin-articles-title">
      <div className="linkedin-section-header">
        <div>
          <p className="section-kicker">LinkedIn Articles</p>
          <h2 id="linkedin-articles-title">Recent Highlights</h2>
        </div>
        <div className="carousel-controls" aria-label="Article carousel controls">
          <button type="button" onClick={previous} disabled={activeIndex === 0} aria-label="Previous articles">
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={next} disabled={activeIndex === maxIndex} aria-label="Next articles">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="linkedin-carousel" aria-live="polite">
        {currentArticles.map((article) => (
          <LinkedInArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="carousel-dots" aria-label="Carousel position">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show article set ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}

export default LinkedInArticlesCarousel;
