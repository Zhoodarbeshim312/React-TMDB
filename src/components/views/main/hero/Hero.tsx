import { useEffect, useRef } from "react";
import scss from "./Hero.module.scss";

interface TypedInstance {
  destroy: () => void;
}

const Hero = () => {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<TypedInstance | null>(null);

  useEffect(() => {
    let isMounted = true;

    import("typed.js").then((mod) => {
      if (!isMounted || !el.current) return;
      const Typed = mod.default;
      typed.current = new Typed(el.current, {
        strings: [
          "Millions of movies.",
          "Ratings you can trust.",
          "Trailers reviews.",
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

  return (
    <section className={scss.Hero}>
      <div className="container">
        <div className={scss.content}>
          <p>Hi there 👋 Welcome to TMDB, The Movie Database</p>
          <h1>
            <span ref={el}></span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export { Hero };
