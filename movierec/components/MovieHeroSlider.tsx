"use client";

import React, { useState, useEffect, useCallback } from 'react';

// Define types for our movie data
interface Movie {
  id: number;
  title: string;
  description: string;
  rating: string;
  genres: string[];
  featured: boolean;
  image: string;
}

const MovieHeroSlider: React.FC = () => {
  // Sample movie data with direct image URLs
  const movies: Movie[] = [
    {
      id: 1,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "9.2",
      genres: ["Sci-Fi", "Adventure", "Drama"],
      featured: true,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&h=900&auto=format&fit=crop" 
    },
    {
      id: 2,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0",
      genres: ["Action", "Crime", "Drama"],
      featured: true,
      image: "https://www.imdb.com/title/tt0816692/mediaviewer/rm319290112/?ref_=ext_shr_lnk"
    },
    {
      id: 3,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: "8.8",
      genres: ["Action", "Adventure", "Sci-Fi"],
      featured: true,
      image: "https://www.imdb.com/title/tt0816692/mediaviewer/rm369621760/?ref_=ext_shr_lnk=80&w=1600&h=900&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      rating: "8.9",
      genres: ["Crime", "Drama"],
      featured: true,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&h=900&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Define goToNext as a useCallback function so it can be used in the useEffect
  const goToNext = useCallback((): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, movies.length]);

  // Auto slide functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, goToNext]);

  const goToPrevious = (): void => {
    if (isTransitioning) return;
    // Pause auto-sliding temporarily when manually navigating
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
      // Resume auto-sliding after transition completes
      setTimeout(() => setIsPaused(false), 2000);
    }, 500);
  };

  const manualGoToNext = (): void => {
    // Pause auto-sliding temporarily when manually navigating
    setIsPaused(true);
    goToNext();
    // Resume auto-sliding after transition completes
    setTimeout(() => setIsPaused(false), 2500);
  };

  const goToSlide = (slideIndex: number): void => {
    if (isTransitioning || slideIndex === currentIndex) return;
    // Pause auto-sliding temporarily when manually navigating
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);
    setTimeout(() => {
      setIsTransitioning(false);
      // Resume auto-sliding after transition completes
      setTimeout(() => setIsPaused(false), 2000);
    }, 500);
  };

  // Pause auto-slide when hovering
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const currentMovie: Movie = movies[currentIndex];

  return (
    <section 
      className="mb-12 overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <div className="relative h-96 w-full overflow-hidden rounded-xl">
          {/* Movie Cover Image with transition effect */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
            style={{ backgroundImage: `url('${currentMovie.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D253F] via-[#0D253F]/80 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container px-8 md:px-12">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-3">
                  {currentMovie.featured && (
                    <span className="rounded-full bg-[#E50914] px-3 py-1 text-xs font-medium uppercase text-white">
                      Featured
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[#FFD700]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm font-medium">{currentMovie.rating}</span>
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-3 md:text-5xl lg:text-6xl transition-opacity duration-300">
                  {currentMovie.title}
                </h1>
                <div className="mb-4 flex flex-wrap gap-2">
                  {currentMovie.genres.map((genre, index) => (
                    <span key={index} className="rounded-full border border-[#708090] px-2 py-1 text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-[#C0C0C0] transition-opacity duration-300">
                  {currentMovie.description}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 rounded bg-[#E50914] px-6 py-3 font-medium text-white hover:bg-opacity-90">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </button>
                  <button className="rounded border border-[#708090] px-6 py-3 font-medium text-[#F5F5F5] hover:border-[#FFD700] hover:text-[#FFD700]">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button 
              onClick={goToPrevious}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C3E50] text-white hover:bg-[#FFD700]"
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button 
              onClick={manualGoToNext}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C3E50] text-white hover:bg-[#FFD700]"
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="flex justify-center gap-2">
              {movies.map((_, index) => (
                <div 
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full cursor-pointer ${
                    index === currentIndex 
                      ? "w-6 bg-[#E50914]" 
                      : "w-2 bg-[#C0C0C0] hover:bg-[#E50914]/50"
                  }`}
                  role="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Invisible overlay to show auto-slide status (for debugging) */}
          {process.env.NODE_ENV === 'development' && isPaused && (
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Auto-slide paused
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieHeroSlider;
