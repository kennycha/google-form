import { FocusEventHandler, useState } from "react";
import styles from "./index.module.scss";
import classNamess from "classnames/bind";

const cx = classNamess.bind(styles);

const DESCRIPTION_PLACEHOLDER = "설문지 설명";

const FormMetaSection = () => {
  const [title, setTitle] = useState("제목 없는 설문지");
  const [description, setDescription] = useState("");
  // @TODO store 내 현재 작업 중인 section 비교로 관리
  const current = false;
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const onTitleDivFocus = () => {
    setIsTitleFocused(true);
  };

  const onTitleDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    setTitle(event.target.innerText);
    setIsTitleFocused(false);
  };

  const onDescriptionDivFocus = () => {
    setIsDescriptionFocused(true);
  };

  const onDescriptionDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    setDescription(event.target.innerText);
    setIsDescriptionFocused(false);
  };

  return (
    <section className={cx("container")}>
      <div className={cx("topBorder")} />
      <div className={cx("leftBorder", { current })} />
      <div className={cx("inner")}>
        <div className={cx("inputDivWrapper")}>
          <div
            className={cx("title")}
            onFocus={onTitleDivFocus}
            onBlur={onTitleDivBlur}
            contentEditable
            suppressContentEditableWarning
          >
            {title}
          </div>
          {current && <div className={cx("underline", { focused: isTitleFocused })} />}
        </div>
        <div className={cx("inputDivWrapper")}>
          <div
            className={cx("description")}
            onFocus={onDescriptionDivFocus}
            onBlur={onDescriptionDivBlur}
            contentEditable
            suppressContentEditableWarning
            placeholder={DESCRIPTION_PLACEHOLDER}
          >
            {description}
          </div>
          {current && <div className={cx("underline", { focused: isDescriptionFocused })} />}
        </div>
      </div>
    </section>
  );
};

export default FormMetaSection;
