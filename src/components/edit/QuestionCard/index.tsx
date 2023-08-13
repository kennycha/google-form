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
  // @TODO store 내 현재 작업 중인 section 비교로 관리
  const current = useMemo(() => {
    return id === currentSectionId;
  }, [currentSectionId, id]);

  return (
    <QuestionWrapper id={id} title={title} type={type} required={required} current={current}>
      <div className={cx("detail")}>
        {/* @TODO 로직 작업 시 변경 */}
        <QuestionDetail id={id} type={type} options={options} />
      </div>
    </QuestionWrapper>
  );
};

export default QuestionCard;
