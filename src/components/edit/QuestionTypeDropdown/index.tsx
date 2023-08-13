import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { IconTypes, QuestionTypes } from "../../../types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Icon from "../../common/Icon";
import { useOutsideClick } from "../../../hooks";

const cx = classNames.bind(styles);

const OPTIONS: { icon: IconTypes; value: QuestionTypes; text: string }[] = [
  {
    icon: "short",
    value: "short",
    text: "단답형",
  },
  {
    icon: "descriptive",
    value: "descriptive",
    text: "장문형",
  },
  {
    icon: "choice",
    value: "choice",
    text: "객관식 질문",
  },
  {
    icon: "checkbox",
    value: "checkbox",
    text: "체크박스",
  },
  {
    icon: "dropdown",
    value: "dropdown",
    text: "드롭다운",
  },
];

interface QuestionTypeDropdownProps {
  currentType: QuestionTypes;
  onOptionSelect: (value: QuestionTypes) => void;
}

const QuestionTypeDropdown = ({ currentType, onOptionSelect }: QuestionTypeDropdownProps) => {
  const [currentOption, setCurrentOption] = useState(OPTIONS.find((option) => option.value === currentType)!);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const optionsTop = useMemo(() => {
    const currentOptionIdx = OPTIONS.findIndex((option) => option.value === currentOption.value);
    if (currentOptionIdx < 2) {
      return -(8 + currentOptionIdx * 48);
    } else {
      return -(8 + 17 + currentOptionIdx * 48);
    }
  }, [currentOption.value]);

  const handleHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: QuestionTypes) => {
    const selected = OPTIONS.find((option) => option.value === value);
    if (!selected) return;

    setCurrentOption(selected);
    setIsOpen(false);
    onOptionSelect(value);
  };

  const onOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOutsideClick(containerRef, onOutsideClick);

  return (
    <div className={cx("container")} ref={containerRef}>
      <button className={cx("header")} onClick={handleHeaderClick}>
        <Icon type={currentOption.icon} size="small" />
        <p className={cx("headerText")}>{currentOption.text}</p>
        <div className={cx("triangle")} />
      </button>
      {isOpen && (
        <div className={cx("options")} style={{ top: optionsTop }}>
          {OPTIONS.map((option, idx) => {
            return (
              <Fragment key={option.value}>
                <button
                  className={cx("option", { current: currentOption.value === option.value })}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <Icon type={option.icon} size="small" />
                  <p className={cx("optionText")}>{option.text}</p>
                </button>
                {idx === 1 && <div className={cx("separator")} />}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionTypeDropdown;
