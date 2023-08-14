import { FormEventHandler, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Icon from "../../common/Icon";
import QuestionInput from "../QuestionInput";
import { DEFAULT_QUESTION_TITLE } from "../../../constants";
import { resetAllAnswers } from "../../../features/form";

const cx = classNames.bind(styles);

const ViewForm = () => {
  const formTitle = useSelector((state: RootState) => state.form.title);
  const formDescription = useSelector((state: RootState) => state.form.description);
  const questions = useSelector((state: RootState) => state.form.questions);

  const dispatch = useDispatch();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setHasSubmitted(true);
    console.log("submit");
  };

  const handleResetButtonClick = () => {
    dispatch(resetAllAnswers());
  };

  return (
    <form className={cx("container")} onSubmit={handleFormSubmit}>
      <div className={cx("header")}>
        <div className={cx("topBorder")} />
        <div className={cx("formMeta")}>
          <h1 className={cx("formTitle")}>{formTitle}</h1>
          <p className={cx("formDescription")}>{formDescription}</p>
        </div>
        <div className={cx("separator")} />
        {/* 아래 영역은 구현 외 영역이라 기능은 구현하지 않습니다.  */}
        <div className={cx("user")}>
          <div className={cx("account")}>
            <p className={cx("accountText")}>dudqn136@naver.com</p>
            <button className={cx("accountButton")}>계정 전환</button>
          </div>
          <button className={cx("cloudButton")}>
            <Icon type="cloud" size="small" />
          </button>
          <button className={cx("mailButton")}>
            <Icon type="mail" size="xsmall" />
            <p>비공개</p>
          </button>
        </div>
        <div className={cx("separator")} />
        <p className={cx("information")}>* 표시는 필수 질문임</p>
      </div>
      <div className={cx("questions")}>
        {questions.map((question) => {
          const hasError = hasSubmitted && question.required && (!question.answer || question.answer.length === 0);

          return (
            <div className={cx("question", { error: hasError })} key={question.id}>
              <p className={cx("questionTitle", { required: question.required })}>
                {question.title.length > 0 ? question.title : DEFAULT_QUESTION_TITLE}
              </p>
              <QuestionInput question={question} hasError={hasError} />
              {hasError && (
                <div className={cx("questionError")}>
                  <Icon type="error" size="small" />
                  <p className={cx("questionErrorText")}>필수 질문입니다.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={cx("footer")}>
        <button className={cx("submitButton")} type="submit">
          제출
        </button>
        <button className={cx("resetButton")} onClick={handleResetButtonClick}>
          양식 지우기
        </button>
      </div>
    </form>
  );
};

export default ViewForm;
