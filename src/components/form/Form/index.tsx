import { FormEventHandler, useLayoutEffect, useState } from "react";
import ActionBar from "../ActionBar";
import FormMetaSection from "../FormMetaSection";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Form = () => {
  const [isDesktopSize, setIsDesktopSize] = useState(false);
  // @TODO section 선택에 따라 이동
  const [actionBarTop, setActionBarTop] = useState(0);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  useLayoutEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth >= 951) {
        setIsDesktopSize(true);
      } else {
        setIsDesktopSize(false);
      }
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <form className={cx("container")} onSubmit={onFormSubmit}>
      <div className={cx("meta")}>
        <FormMetaSection />
      </div>
      <ol className={cx("questions")}></ol>
      <div className={cx("actionBar")} style={isDesktopSize ? { top: actionBarTop } : {}}>
        <ActionBar />
      </div>
    </form>
  );
};

export default Form;
