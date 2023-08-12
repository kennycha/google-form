import { Fragment, useMemo, useState } from "react";
import { IconTypes } from "../../../types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Icon from "../../common/Icon";

const cx = classNames.bind(styles);

const OPTIONS: { icon: IconTypes; value: string; text: string }[] = [
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
  onSelectOption: (value: string) => void;
}

const QuestionTypeDropdown = ({ onSelectOption }: QuestionTypeDropdownProps) => {
  const [currentOption, setCurrentOption] = useState(OPTIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const optionsTop = useMemo(() => {
    const currentOptionIdx = OPTIONS.findIndex((option) => option.value === currentOption.value);
    if (currentOptionIdx < 2) {
      return -(8 + currentOptionIdx * 48);
    } else {
      return -(8 + 17 + currentOptionIdx * 48);
    }
  }, [currentOption.value]);

  const onHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onOptionClick = (value: string) => {
    const selected = OPTIONS.find((option) => option.value === value);
    if (!selected) return;

    setCurrentOption(selected);
    setIsOpen(false);
    onSelectOption(value);
  };

  return (
    <div className={cx("container")}>
      <button className={cx("header")} onClick={onHeaderClick}>
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
                  onClick={() => onOptionClick(option.value)}
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
