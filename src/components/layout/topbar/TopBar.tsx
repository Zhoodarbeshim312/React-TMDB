import scss from "./TopBar.module.scss";

interface ITopBarProps {
  onBurgerClick: () => void;
}

const TopBar = ({ onBurgerClick }: ITopBarProps) => {
  return (
    <section className={scss.TopBar}>
      <div className="container">
        <div className={scss.content}>
          <button
            type="button"
            className={scss.burger}
            onClick={onBurgerClick}
            aria-label="Открыть меню"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={scss.logo}>
            <span className={scss.logoIcon}>🎬</span>
            <span className={scss.title}>The Movie Database</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TopBar };
