import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Header from "../Header";
import Form from "../edit/Form";

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("form")}>
        <Form />
      </div>
    </div>
  );
};

export default App;
