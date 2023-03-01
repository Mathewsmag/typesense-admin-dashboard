import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import classes from "./sass/home.module.scss";
import Aside from "../../components/shared/sidebar/aside/aside";
import Header from "../../components/shared/navbar/header";
import { RootState } from "../../redux/store/store";
import AddCurationsModal from "../../components/pages/curations/addCurationsModal/addCurationsModal";
import AddSynonymModal from "../../components/pages/synonyms/addSynonymsModal/addSynonymModal";

function Home() {
  const { openCurationModal, openSynonymModal } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <div className={classes.Home}>
      {openCurationModal && <AddCurationsModal />}
      {openSynonymModal && <AddSynonymModal />}
      <aside className={clsx(classes.Aside, "px-5 pt-3")}>
        <Aside />
      </aside>
      <header className={clsx(classes.Header, "px-3 py-2 ")}>
        <Header />
      </header>
      <main className={clsx(classes.Main)}>
        <Outlet />
      </main>
    </div>
  );
}
export default Home;
