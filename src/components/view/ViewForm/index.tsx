import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ViewForm = () => {
  return <form className={cx("container")}>ViewForm</form>;
};

export default ViewForm;
