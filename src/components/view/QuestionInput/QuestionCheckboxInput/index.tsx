import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { QuestionOption } from "../../../../types";
import { ETC_OPTION_ID } from "../../../../constants";

const cx = classNames.bind(styles);

interface QuestionCheckboxInputProps {
  options: QuestionOption[];
  answer?: QuestionOption[];
  hasError: boolean;
  onAnswerChange: (value: QuestionOption[]) => void;
  onAnswerReset: () => void;
}

const QuestionCheckboxInput = ({
  options,
  answer,
  hasError,
  onAnswerChange,
  onAnswerReset,
}: QuestionCheckboxInputProps) => {
  const [etcText, setEtcText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptionClick = (option: QuestionOption) => {
    if (!answer) {
      if (option.id === ETC_OPTION_ID) {
        onAnswerChange([{ id: ETC_OPTION_ID, value: etcText }]);
      } else {
        onAnswerChange([option]);
      }
    } else {
      if (answer.find((opt) => opt.id === option.id)) {
        onAnswerChange(answer.filter((opt) => opt.id !== option.id));
      } else {
        onAnswerChange([...answer, option.id === ETC_OPTION_ID ? { id: ETC_OPTION_ID, value: etcText } : option]);
      }
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEtcText(event.target.value);
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
          const checked = Boolean(answer && answer.find((opt) => opt.id === option.id));

          return (
            <li
              className={cx("option", { current: checked })}
              key={option.id}
              onClick={() => handleOptionClick(option)}
            >
              <input className={cx("optionCheckbox")} type="checkbox" checked={checked} onChange={() => {}} />
              <p className={cx("optionText")}>{option.value}</p>
            </li>
          );
        })}
        {etcOption && (
          <div className={cx("etc", { current: Boolean(answer && answer.find((opt) => opt.id === ETC_OPTION_ID)) })}>
            <input
              className={cx("optionCheckbox")}
              type="checkbox"
              checked={Boolean(answer && answer.find((opt) => opt.id === ETC_OPTION_ID))}
              onClick={() => handleOptionClick(etcOption)}
              onChange={() => {}}
            />
            <p className={cx("ectLabel")}>기타: </p>
            <div className={cx("etcInputWrapper")}>
              <input
                className={cx("etcInput")}
                type="text"
                value={etcText}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <div className={cx("underline")} />
            </div>
          </div>
        )}
      </ul>
      {answer && answer.length > 0 && (
        <div className={cx("resetButtonWrapper")}>
          <div className={cx("resetButton")} onClick={handleResetButtonClick}>
            선택해제
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCheckboxInput;
