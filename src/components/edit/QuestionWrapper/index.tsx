import { FocusEventHandler, PropsWithChildren, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Icon from "../../common/Icon";
import QuestionTypeDropdown from "../QuestionTypeDropdown";

const cx = classNames.bind(styles);

const TITLE_PLACE_HOLDER = "질문";
const TOGGLE_LABEL_TEXT = "필수";

interface QuestionWrapperProps {
  current: boolean;
}

const QuestionWrapper = ({ current, children }: PropsWithChildren<QuestionWrapperProps>) => {
  const [title, setTitle] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const onTitleDivFocus = () => {
    setIsTitleFocused(true);
  };

  const onTitleDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    setTitle(event.target.innerText);
    setIsTitleFocused(false);
  };

  // @TODO state 관리
  const isRequired = true;

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
            onFocus={onTitleDivFocus}
            onBlur={onTitleDivBlur}
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
          <QuestionTypeDropdown onSelectOption={() => {}} />
        </div>
      </div>
      <div className={cx("detail")}>{children}</div>
      <div className={cx("options")}>
        <div className={cx("optionsInner")}>
          <button className={cx("copyButton")}>
            <Icon type="copy" />
          </button>
          <button className={cx("deleteButton")}>
            <Icon type="delete" />
          </button>
          <div className={cx("separator")} />
          <div className={cx("requiredToggleWrapper", { toggled: isRequired })}>
            <label htmlFor="requiredToggle" className={cx("toggleLabel")}>
              {TOGGLE_LABEL_TEXT}
            </label>
            <div id="requiredToggle" className={cx("toggle")} role="checkbox">
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
