import { memo } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DescriptiveQuestionDetail = memo(() => {
  return (
    <div className={cx("container")}>
      <div className={cx("inner")}>
        <input className={cx("answer")} type="text" disabled placeholder="장문형 텍스트" value="" />
        <div className={cx("underline")} />
      </div>
    </div>
  );
});

export default DescriptiveQuestionDetail;
