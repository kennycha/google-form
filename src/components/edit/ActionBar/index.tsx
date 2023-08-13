import { useLayoutEffect, useState } from "react";
import Icon from "../../common/Icon";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { IconSizeTypes } from "../../../types";

const cx = classNames.bind(styles);

const OTHER_ICON_TYPES = ["upload", "text", "image", "video", "section"] as const;

const ActionBar = () => {
  const [iconSize, setIconSize] = useState<IconSizeTypes>("medium");

  useLayoutEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth >= 951) {
        setIconSize("medium");
      } else {
        setIconSize("large");
      }
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div className={cx("container")}>
      <ol className={cx("inner")}>
        <button className={cx("addButton")}>
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
