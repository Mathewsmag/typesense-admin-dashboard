import { Outlet } from "react-router-dom";
import clsx from "clsx";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";
import classes from "./sass/home.module.scss";
import Aside from "../../components/shared/sidebar/aside/aside";
import Header from "../../components/shared/navbar/header";
import { useAppDispatch } from "../../redux/store/store";
import { changeTheme } from "../../redux/slices/theme/themeSlice";
import ModalCongregation from "./modalCongregation";

function Home() {
  const dispatch = useAppDispatch();

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [systheme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = systheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    dispatch(changeTheme(systheme));
  }, [dispatch, systheme]);

  return (
    <div className={clsx(classes.Home, systheme)}>
      <ModalCongregation />
      <aside
        className={clsx(
          classes.Aside,
          "px-5 pt-3 border-r-2 border-[#e5e5e5] dark:border-gray-600 dark:bg-[#0d1117]"
        )}
      >
        <Aside changTheme={switchTheme} theme={systheme} />
      </aside>
      <header
        className={clsx(
          classes.Header,
          "px-3 py-2 dark:bg-[#161b22] border-b-2 border-[#e5e5e5] dark:border-gray-600"
        )}
      >
        <Header />
      </header>
      <main className={clsx(classes.Main, "dark:bg-[#0d1117]")}>
        <Outlet />
      </main>
    </div>
  );
}
export default Home;
