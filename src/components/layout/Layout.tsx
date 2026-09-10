import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./sidebar/SideBar";
import { TopBar } from "./topbar/TopBar";
import scss from "./Layout.module.scss";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={scss.Layout}>
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <div className={scss.overlay} onClick={closeSidebar} />}
      <div className={scss.main}>
        <TopBar onBurgerClick={toggleSidebar} />
        <main className={scss.page}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { Layout };
