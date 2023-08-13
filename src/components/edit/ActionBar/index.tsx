import { useLayoutEffect, useState } from "react";
import Icon from "../../common/Icon";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { IconSizeTypes } from "../../../types";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../../features/form";

const cx = classNames.bind(styles);

const OTHER_ICON_TYPES = ["upload", "text", "image", "video", "section"] as const;

const ActionBar = () => {
  const dispatch = useDispatch();

  const [iconSize, setIconSize] = useState<IconSizeTypes>("medium");

  const handleAddButtonClick = () => {
    dispatch(addQuestion());
  };

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 951) {
        setIconSize("medium");
      } else {
        setIconSize("large");
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={cx("container")}>
      <ol className={cx("inner")}>
        <button className={cx("addButton")} onClick={handleAddButtonClick}>
          <Icon type="add" size={iconSize} />
        </button>
        {/* 아래 영역은 구현 외 영역이라 기능은 구현하지 않습니다.  */}
        {OTHER_ICON_TYPES.map((iconType) => (
          <button className={cx("unusedButton")} key={iconType}>
            <Icon type={iconType} size={iconSize} />
          </button>
        ))}
      </ol>
    </div>
  );
};

export default ActionBar;
