import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const App = () => {
  return <div className={cx("container")}></div>;
};

export default App;
