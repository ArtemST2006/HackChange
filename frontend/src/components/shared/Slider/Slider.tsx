import React, { useState, useEffect } from 'react';
import './Slider.css';

export interface SliderItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

interface SliderProps {
  items: SliderItem[];
  onItemClick?: (item: SliderItem) => void;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export const Slider: React.FC<SliderProps> = ({
  items,
  onItemClick,
  autoScroll = true,
  autoScrollInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoScroll || !items || items.length === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, currentIndex, items]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  return (
    <div className="slider">
      <div className="slider-content">
        <div
          className="slider-item"
          onClick={() => onItemClick?.(currentItem)}
          style={{ backgroundImage: `url(${currentItem.image})` }}
        >
          <div className="slider-overlay">
            {currentItem.badge && <span className="slider-badge">{currentItem.badge}</span>}
            <h3 className="slider-title">{currentItem.title}</h3>
            <p className="slider-description">{currentItem.description}</p>
          </div>
        </div>

        <button className="slider-arrow slider-arrow-left" onClick={goToPrevious}>
          ‹
        </button>
        <button className="slider-arrow slider-arrow-right" onClick={goToNext}>
          ›
        </button>
      </div>

      <div className="slider-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
