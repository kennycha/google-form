import { FormEventHandler, useLayoutEffect, useState } from "react";
import ActionBar from "../ActionBar";
import FormMetaSection from "../FormMetaSection";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import QuestionCard from "../QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { moveSection } from "../../../features/app";
import { META_SECTION_ID } from "../../../constants";

const cx = classNames.bind(styles);

const EditForm = () => {
  const questions = useSelector((state: RootState) => state.form.questions);

  const dispatch = useDispatch();

  const [isDesktopSize, setIsDesktopSize] = useState(false);
  // @TODO section 선택에 따라 이동
  const [actionBarTop, setActionBarTop] = useState(0);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleSectionClick = (id: string) => {
    dispatch(moveSection(id));
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
      <div className={cx("meta")} onClick={() => handleSectionClick(META_SECTION_ID)}>
        <FormMetaSection />
      </div>
      <ol className={cx("questions")}>
        {questions.map((question) => {
          return (
            <li key={question.id} onClick={() => handleSectionClick(question.id)}>
              <QuestionCard {...question} />
            </li>
          );
        })}
      </ol>
      <div className={cx("actionBar")} style={isDesktopSize ? { top: actionBarTop } : {}}>
        <ActionBar />
      </div>
    </form>
  );
};

export default EditForm;
