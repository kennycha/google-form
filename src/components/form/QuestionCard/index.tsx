import QuestionWrapper from "../QuestionWrapper";
// import styles from "./index.module.scss";
// import classNames from "classnames/bind";

// const cx = classNames.bind(styles);

const QuestionCard = () => {
  // @TODO store 내 현재 작업 중인 section 비교로 관리
  const current = true;

  return (
    <QuestionWrapper current={current}>
      <div>카드 디테일</div>
    </QuestionWrapper>
  );
};

export default QuestionCard;
