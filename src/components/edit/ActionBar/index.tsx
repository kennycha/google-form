import { memo, useCallback, useState } from "react";
import Icon from "../../common/Icon";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { IconSizeTypes } from "../../../types";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../../features/form";
import { useWindowResize } from "../../../hooks";

const cx = classNames.bind(styles);

const OTHER_ICON_TYPES = ["upload", "text", "image", "video", "section"] as const;

const ActionBar = memo(() => {
  const dispatch = useDispatch();

  const [iconSize, setIconSize] = useState<IconSizeTypes>("medium");

  const handleAddButtonClick = () => {
    dispatch(addQuestion());
  };

  const onWindowResize = useCallback(() => {
    if (window.innerWidth >= 951) {
      setIconSize("medium");
    } else {
      setIconSize("large");
    }
  }, []);
  useWindowResize(onWindowResize);

  return (
    <div className={cx("container")}>
      <ol className={cx("inner")}>
        <button className={cx("addButton")} onClick={handleAddButtonClick}>
          <Icon type="add" size={iconSize} />
        </button>
        {OTHER_ICON_TYPES.map((iconType) => (
          <button className={cx("unusedButton")} key={iconType}>
            <Icon type={iconType} size={iconSize} />
          </button>
        ))}
      </ol>
    </div>
  );
});

export default ActionBar;
