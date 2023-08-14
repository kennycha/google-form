import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { QuestionOption } from "../../../../types";
import { ETC_OPTION_ID } from "../../../../constants";

const cx = classNames.bind(styles);

interface QuestionChoiceInputProps {
  options: QuestionOption[];
  answer?: QuestionOption;
  hasError: boolean;
  onAnswerChange: (value: QuestionOption) => void;
  onAnswerReset: () => void;
}

const QuestionChoiceInput = ({
  options,
  answer,
  hasError,
  onAnswerChange,
  onAnswerReset,
}: QuestionChoiceInputProps) => {
  const [etcText, setEtcText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptionClick = (option: QuestionOption) => {
    if (answer && answer.id === option.id) {
      onAnswerReset();
    } else {
      if (option.id === ETC_OPTION_ID) {
        onAnswerChange({ id: ETC_OPTION_ID, value: etcText });
        inputRef.current?.focus();
      } else {
        onAnswerChange(option);
      }
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEtcText(event.target.value);
  };

  const handleInputFocus = () => {
    onAnswerChange({ id: ETC_OPTION_ID, value: etcText });
  };

  const handleResetButtonClick = () => {
    onAnswerReset();
  };

  const otherOptions = useMemo(() => options.filter((option) => option.id !== ETC_OPTION_ID), [options]);
  const etcOption = useMemo(() => options.find((option) => option.id === ETC_OPTION_ID), [options]);

  return (
    <div className={cx("container", { error: hasError })}>
      <ul className={cx("options")}>
        {otherOptions.map((option) => {
          return (
            <li
              className={cx("option", { current: answer && answer.id === option.id })}
              key={option.id}
              onClick={() => handleOptionClick(option)}
            >
              <div className={cx("circle")}>
                <div className={cx("circleInner")}></div>
              </div>
              <p className={cx("optionText")}>{option.value}</p>
            </li>
          );
        })}
        {etcOption && (
          <div className={cx("etc", { current: answer && answer.id === ETC_OPTION_ID })}>
            <div className={cx("circle")} onClick={() => handleOptionClick(etcOption)}>
              <div className={cx("circleInner")}></div>
            </div>
            <p className={cx("ectLabel")}>기타: </p>
            <div className={cx("etcInputWrapper")}>
              <input
                className={cx("etcInput")}
                type="text"
                value={etcText}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                ref={inputRef}
              />
              <div className={cx("underline")} />
            </div>
          </div>
        )}
      </ul>
      {answer && (
        <div className={cx("resetButtonWrapper")}>
          <div className={cx("resetButton")} onClick={handleResetButtonClick}>
            선택해제
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionChoiceInput;
