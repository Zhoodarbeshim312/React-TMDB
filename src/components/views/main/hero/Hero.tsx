import { useEffect, useRef, useState } from "react";
import axios from "axios";
import scss from "./Hero.module.scss";
import { api_key } from "../../../../api/api";
import type { IData, IResponse } from "../../../../types";

interface TypedInstance {
  destroy: () => void;
}

const Hero = () => {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<TypedInstance | null>(null);
  const [movies, setMovies] = useState<IData[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios
      .get<IResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`,
      )
      .then((res) => {
        if (!isMounted) return;
        setMovies(res.data.results);
      })
      .catch((err) => console.error(err));

    import("typed.js").then((mod) => {
      if (!isMounted || !el.current) return;
      const Typed = mod.default;
      typed.current = new Typed(el.current, {
        strings: [
          "Millions of movies.",
          "Ratings you can trust.",
          "Trailers & reviews.",
          "Discover something new.",
          "Made for movie lovers.",
          "Cinema, simplified.",
        ],
        typeSpeed: 60,
        backSpeed: 5,
        backDelay: 1500,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: "|",
      });
    });

    return () => {
      isMounted = false;
      typed.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMovieIndex((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[movieIndex];

  return (
    <section className={scss.Hero}>
      <div className="container">
        <div className={scss.layout}>
          <div className={scss.content}>
            <p>Hi there 👋 Welcome to TMDB, The Movie Database</p>
            <h1>
              <span ref={el}></span>
            </h1>

            <p className={scss.subtitle}>
              Explore millions of movies, TV shows and the people behind them.
              Ratings, reviews, and trailers — all in one place.
            </p>

            <div className={scss.actions}>
              <button className={scss.primaryBtn}>Explore Movies</button>
              <button className={scss.secondaryBtn}>Top Rated</button>
            </div>
          </div>

          {movie && (
            <div className={`${scss.card} ${fade ? scss.cardVisible : ""}`}>
              <div className={scss.cardGlow} />
              <img
                className={scss.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className={scss.cardInfo}>
                <span className={scss.rating}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <h3 className={scss.cardTitle}>{movie.title}</h3>
                <span className={scss.year}>
                  {movie.release_date?.slice(0, 4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero };
