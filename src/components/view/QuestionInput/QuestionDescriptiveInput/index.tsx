import { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface QuestionDescriptiveInputProps {
  answer?: string;
  onAnswerChange: (value: string) => void;
}

const QuestionDescriptiveInput = ({ answer = "", onAnswerChange }: QuestionDescriptiveInputProps) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("inner")}>
        <input className={cx("answer")} type="text" onChange={handleInputChange} value={answer} placeholder="내 답변" />
        <div className={cx("underline")} />
      </div>
    </div>
  );
};

export default QuestionDescriptiveInput;
