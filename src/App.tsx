import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MainPage } from "./components/views/MainPage";

interface IRouter {
  id: number;
  path: string;
  element: ReactElement;
}

const ROUTER: IRouter[] = [
  {
    id: 1,
    path: "/",
    element: <MainPage />,
  },
];

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {ROUTER.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export { App };
