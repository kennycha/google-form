import { ChangeEventHandler, memo } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface QuestionShortInputProps {
  answer?: string;
  hasError: boolean;
  onAnswerChange: (value: string) => void;
}

const QuestionShortInput = memo(({ answer = "", hasError, onAnswerChange }: QuestionShortInputProps) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className={cx("container", { error: hasError })}>
      <div className={cx("inner")}>
        <input className={cx("answer")} type="text" onChange={handleInputChange} value={answer} placeholder="내 답변" />
        <div className={cx("underline")} />
      </div>
    </div>
  );
});

export default QuestionShortInput;
