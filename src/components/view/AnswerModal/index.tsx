import { useSelector } from "react-redux";
import Modal from "../../common/Modal";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../../store";
import { ReactNode, memo } from "react";
import { checkHasManualAnswer, checkHasSingleAnswer } from "../../../utils";

const cx = classNames.bind(styles);

interface AnswerModalProps {
  onClose: () => void;
}

const AnswerModal = memo(({ onClose }: AnswerModalProps) => {
  const questions = useSelector((state: RootState) => state.form.questions);

  return (
    <Modal onClose={onClose}>
      <div className={cx("container")}>
        <h1 className={cx("title")}>내 답변</h1>
        <ul className={cx("answers")}>
          {questions.map((question) => {
            let inner: ReactNode;
            if (checkHasManualAnswer(question)) {
              inner = <p className={cx("answerText")}>{question.answer ?? ""}</p>;
            } else if (checkHasSingleAnswer(question)) {
              inner = <p className={cx("answerText")}>{question.answer?.value ?? ""}</p>;
            } else {
              inner = question.answer?.map(
                (answer) =>
                  (
                    <p className={cx("answerText")} key={answer.id}>
                      {answer.value}
                    </p>
                  ) ?? <p></p>
              );
            }

            return (
              <li className={cx("answerWrapper")} key={question.id}>
                <p className={cx("questionTitle")}>{question.title.length > 1 ? question.title : "질문"}</p>
                <div className={cx("separator")} />
                {inner}
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
});

export default AnswerModal;
