import { FormEventHandler, useLayoutEffect, useState } from "react";
import ActionBar from "../ActionBar";
import FormMetaSection from "../FormMetaSection";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import QuestionCard from "../QuestionCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const cx = classNames.bind(styles);

const Form = () => {
  const [isDesktopSize, setIsDesktopSize] = useState(false);
  const questions = useSelector((state: RootState) => state.form.questions);

  // @TODO section 선택에 따라 이동
  const [actionBarTop, setActionBarTop] = useState(0);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 951) {
        setIsDesktopSize(true);
      } else {
        setIsDesktopSize(false);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <form className={cx("container")} onSubmit={handleFormSubmit}>
      <div className={cx("meta")}>
        <FormMetaSection />
      </div>
      <ol className={cx("questions")}>
        {questions.map((question) => {
          return <QuestionCard key={question.id} {...question} />;
        })}
      </ol>
      <div className={cx("actionBar")} style={isDesktopSize ? { top: actionBarTop } : {}}>
        <ActionBar />
      </div>
    </form>
  );
};

export default Form;
