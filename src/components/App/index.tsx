import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Header from "../Header";
import EditForm from "../edit/EditForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ViewForm from "../view/ViewForm";
import { memo, useMemo } from "react";

const cx = classNames.bind(styles);

const App = memo(() => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const isViewMode = useMemo(() => mode === "view", [mode]);

  return (
    <div className={cx("container", { view: isViewMode })}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("form")}>{isViewMode ? <ViewForm /> : <EditForm />}</div>
    </div>
  );
});

export default App;
