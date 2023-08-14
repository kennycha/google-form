import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Question } from "../../../types";
import QuestionDetail from "../QuestionDetail";
import QuestionWrapper from "../QuestionWrapper";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useMemo } from "react";

const cx = classNames.bind(styles);

type QuestionCardProps = Question;

const QuestionCard = ({ id, title, type, options, required }: QuestionCardProps) => {
  const currentSectionId = useSelector((state: RootState) => state.app.currentSectionId);

  const current = useMemo(() => {
    return id === currentSectionId;
  }, [currentSectionId, id]);

  return (
    <QuestionWrapper id={id} title={title} type={type} required={required} current={current}>
      <div className={cx("detail")}>
        <QuestionDetail id={id} type={type} options={options} current={current} />
      </div>
    </QuestionWrapper>
  );
};

export default QuestionCard;
