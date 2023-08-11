import FormMetaSection from "../FormMetaSection";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Form = () => {
  return (
    <form className={cx("container")}>
      <FormMetaSection />
    </form>
  );
};

export default Form;
