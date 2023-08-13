import { FocusEventHandler, useState } from "react";
import styles from "./index.module.scss";
import classNamess from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { changeFormDescription, changeFormTitle } from "../../../features/form";

const cx = classNamess.bind(styles);

const DESCRIPTION_PLACEHOLDER = "설문지 설명";

const FormMetaSection = () => {
  const title = useSelector((state: RootState) => state.form.title);
  const description = useSelector((state: RootState) => state.form.description);

  const dispatch = useDispatch();

  // @TODO store 내 현재 작업 중인 section 비교로 관리
  const current = false;
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const handleTitleDivFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const { innerText } = event.target;
    if (innerText.length === 0) return;
    dispatch(changeFormTitle(innerText));
    setIsTitleFocused(false);
  };

  const handleDescriptionDivFocus = () => {
    setIsDescriptionFocused(true);
  };

  const handleDescriptionDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const { innerText } = event.target;
    if (innerText.length === 0) return;
    dispatch(changeFormDescription(innerText));
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
            onFocus={handleTitleDivFocus}
            onBlur={handleTitleDivBlur}
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
            onFocus={handleDescriptionDivFocus}
            onBlur={handleDescriptionDivBlur}
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
