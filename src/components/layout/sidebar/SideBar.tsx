import { NavLink } from "react-router-dom";
import scss from "./SideBar.module.scss";

interface ISideBarItem {
  id: number;
  path: string;
  label: string;
}

interface ISideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIDEBAR_ITEMS: ISideBarItem[] = [
  {
    id: 1,
    path: "/",
    label: "Main",
  },
  {
    id: 2,
    path: "/",
    label: "Top Rated",
  },
  {
    id: 3,
    path: "/",
    label: "Popular",
  },
];

const SideBar = ({ isOpen, onClose }: ISideBarProps) => {
  return (
    <aside className={`${scss.SideBar} ${isOpen ? scss.open : ""}`}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>My App</div>
          <nav className={scss.nav}>
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `${scss.link} ${isActive ? scss.active : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export { SideBar };
