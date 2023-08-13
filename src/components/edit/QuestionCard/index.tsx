import { QuestionTypes } from "../../../types";
import QuestionDetail from "../QuestionDetail";
import QuestionWrapper from "../QuestionWrapper";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DUMMY_OPTIONS = [
  { id: "1", value: "옵션 1" },
  { id: "2", value: "옵션 2" },
  { id: "3", value: "옵션 2" },
  { id: "4", value: "옵션 4" },
  { id: "5", value: "옵션 4" },
];

interface QuestionCardProps {
  id: string;
}

const QuestionCard = ({ id }: QuestionCardProps) => {
  // @TODO store 내 현재 작업 중인 section 비교로 관리
  const current = true;

  // @TODO store 에서 id로 질문 받아와서 type 확인
  const types: QuestionTypes[] = ["short", "descriptive", "choice", "checkbox", "dropdown"];

  return (
    <QuestionWrapper current={current}>
      <div className={cx("detail")}>
        {/* @TODO 로직 작업 시 변경 */}
        <QuestionDetail type={types[id.length]} options={DUMMY_OPTIONS} />
      </div>
    </QuestionWrapper>
  );
};

export default QuestionCard;
