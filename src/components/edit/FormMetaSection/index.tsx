import { FocusEventHandler, useMemo, useState } from "react";
import styles from "./index.module.scss";
import classNamess from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { changeFormDescription, changeFormTitle } from "../../../features/form";
import { META_SECTION_ID } from "../../../constants";

const cx = classNamess.bind(styles);

const DESCRIPTION_PLACEHOLDER = "설문지 설명";

const FormMetaSection = () => {
  const currentSectionId = useSelector((state: RootState) => state.app.currentSectionId);
  const title = useSelector((state: RootState) => state.form.title);
  const description = useSelector((state: RootState) => state.form.description);

  const dispatch = useDispatch();

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const current = useMemo(() => {
    return currentSectionId === META_SECTION_ID;
  }, [currentSectionId]);

  const handleTitleDivFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    setIsTitleFocused(false);
    const { innerText } = event.target;
    if (innerText.length === 0) return;
    dispatch(changeFormTitle(innerText));
  };

  const handleDescriptionDivFocus = () => {
    setIsDescriptionFocused(true);
  };

  const handleDescriptionDivBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    setIsDescriptionFocused(false);
    const { innerText } = event.target;
    if (innerText.length === 0) return;
    dispatch(changeFormDescription(innerText));
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
