import { memo } from "react";
import { IconSizeTypes, IconTopEnum, IconTypes } from "../../../types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IconProps {
  type: IconTypes;
  size?: IconSizeTypes;
}

const Icon = memo(({ type, size = "large" }: IconProps) => {
  return (
    <span className={cx("container", size)}>
      <div className={cx("inner")}>
        <div className={cx("icon")} style={{ top: `-${IconTopEnum[type]}px` }}></div>
      </div>
    </span>
  );
});

export default Icon;
