import { FormEventHandler, MouseEvent, useLayoutEffect, useRef, useState } from "react";
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
  const metaDivRef = useRef<HTMLDivElement>(null);
  const questionsOlRef = useRef<HTMLOListElement>(null);
  const [actionBarTop, setActionBarTop] = useState(0);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleSectionClick = (event: MouseEvent, id: string) => {
    dispatch(moveSection(id));

    if (metaDivRef.current && questionsOlRef.current) {
      [metaDivRef.current, ...questionsOlRef.current.children].forEach((element) => {
        if (element.contains(event.target as Node)) {
          setTimeout(() => {
            setActionBarTop(element.getBoundingClientRect().top);
          }, 0);
        }
      });
    }
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
      <div className={cx("meta")} onClick={(event) => handleSectionClick(event, META_SECTION_ID)} ref={metaDivRef}>
        <FormMetaSection />
      </div>
      <ol className={cx("questions")} ref={questionsOlRef}>
        {questions.map((question) => {
          return (
            <li key={question.id} onClick={(event) => handleSectionClick(event, question.id)}>
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
