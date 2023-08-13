import { FocusEventHandler, PropsWithChildren, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Icon from "../../common/Icon";
import QuestionTypeDropdown from "../QuestionTypeDropdown";
import { useDispatch } from "react-redux";
import {
  changeQuestionTitle,
  changeQuestionType,
  deleteQuestion,
  duplicateQuestion,
  toggleQuestionRequired,
} from "../../../features/form";
import { QuestionTypes } from "../../../types";

const cx = classNames.bind(styles);

const TITLE_PLACE_HOLDER = "질문";
const TOGGLE_LABEL_TEXT = "필수";

interface QuestionWrapperProps {
  id: string;
  title: string;
  type: QuestionTypes;
  required: boolean;
  current: boolean;
}

const QuestionWrapper = ({
  id: questionId,
  title,
  type,
  required,
  current,
  children,
}: PropsWithChildren<QuestionWrapperProps>) => {
  const dispatch = useDispatch();

  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const handleTitleDivFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    dispatch(changeQuestionTitle({ questionId, value: event.target.innerText }));
    setIsTitleFocused(false);
  };

  const handleToggleClick = () => {
    dispatch(toggleQuestionRequired({ questionId }));
  };

  const handleDuplicateButtonClick = () => {
    dispatch(duplicateQuestion({ questionId }));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteQuestion({ questionId }));
  };

  const onOptionSelect = (value: QuestionTypes) => {
    dispatch(changeQuestionType({ questionId, value }));
  };

  return (
    <div className={cx("container")}>
      <div className={cx("dragHandle")}>
        <Icon type="drag" />
      </div>
      <div className={cx("leftBorder", { current })} />
      <div className={cx("meta")}>
        <div className={cx("inputDivWrapper")}>
          <div
            className={cx("title")}
            onFocus={handleTitleDivFocus}
            onBlur={handleTitleDivBlur}
            contentEditable
            suppressContentEditableWarning
            placeholder={TITLE_PLACE_HOLDER}
          >
            {title}
          </div>
          <div className={cx("underline", { focused: isTitleFocused })} />
        </div>
        {/* 아래 요소는 구현 외 요소라 기능은 구현하지 않습니다.  */}
        <button className={cx("imageButton")}>
          <Icon type="image" />
        </button>
        <div className={cx("type")}>
          {/* @TODO 콜백 변경 */}
          <QuestionTypeDropdown currentType={type} onOptionSelect={onOptionSelect} />
        </div>
      </div>
      {children}
      <div className={cx("options")}>
        <div className={cx("optionsInner")}>
          <button className={cx("duplicateButton")} onClick={handleDuplicateButtonClick}>
            <Icon type="copy" />
          </button>
          <button className={cx("deleteButton")} onClick={handleDeleteButtonClick}>
            <Icon type="delete" />
          </button>
          <div className={cx("separator")} />
          <div className={cx("requiredToggleWrapper", { toggled: required })}>
            <label htmlFor="requiredToggle" className={cx("toggleLabel")} onClick={handleToggleClick}>
              {TOGGLE_LABEL_TEXT}
            </label>
            <div id="requiredToggle" className={cx("toggle")} role="checkbox" onClick={handleToggleClick}>
              <div className={cx("toggleBar")} />
              <div className={cx("toggleHeadWrapper")}>
                <div className={cx("toggleHead")} />
              </div>
            </div>
          </div>
          {/* 아래 요소는 구현 외 요소라 기능은 구현하지 않습니다.  */}
          <button className={cx("moreButton")}>
            <Icon type="more" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionWrapper;
