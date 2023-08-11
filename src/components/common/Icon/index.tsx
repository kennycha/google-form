import { IconTopEnum } from "../../../types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IconProps {
  top: IconTopEnum;
}

const Icon = ({ top }: IconProps) => {
  return (
    <span className={cx("container")}>
      <div className={cx("inner")}>
        <div className={cx("icon")} style={{ top: `-${top}px` }}></div>
      </div>
    </span>
  );
};

export default Icon;
