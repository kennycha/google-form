import { useCallback, useMemo, useRef, useState } from "react";
import { QuestionOption } from "../../../../types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useOutsideClick } from "../../../../hooks";

const cx = classNames.bind(styles);

interface QuestionDropdownInputProps {
  options: QuestionOption[];
  answer?: QuestionOption;
  onAnswerChange: (value: QuestionOption) => void;
  onAnswerReset: () => void;
}

const QuestionDropdownInput = ({ options, answer, onAnswerChange, onAnswerReset }: QuestionDropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const optionsTop = useMemo(() => {
    if (!answer) {
      return -8;
    } else {
      const answerIndex = options.findIndex((option) => option.id === answer.id);
      return -(8 + 48 + 17 + answerIndex * 48);
    }
  }, [answer, options]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleResetClick = () => {
    onAnswerReset();
    setIsOpen(false);
  };

  const handleOptionClick = (option: QuestionOption) => {
    onAnswerChange(option);
    setIsOpen(false);
  };

  const onOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(containerRef, onOutsideClick);

  return (
    <div className={cx("container")} ref={containerRef}>
      <div className={cx("header")} onClick={handleHeaderClick}>
        <p className={cx("headerText")}>{answer ? answer.value : "선택"}</p>
        <div className={cx("triangle")} />
      </div>
      {isOpen && (
        <ul className={cx("options")} style={{ top: optionsTop }}>
          <li className={cx("reset", { current: !answer })} onClick={handleResetClick}>
            <p className={cx("resetText")}>선택</p>
          </li>
          <div className={cx("separator")} />
          {options.map((option) => {
            return (
              <li
                key={option.id}
                className={cx("option", { current: answer && answer.id === option.id })}
                onClick={() => handleOptionClick(option)}
              >
                <p className={cx("optionText")}>{option.value}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default QuestionDropdownInput;
