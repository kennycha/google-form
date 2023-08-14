import { FormEventHandler } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Icon from "../../common/Icon";

const cx = classNames.bind(styles);

const ViewForm = () => {
  const formTitle = useSelector((state: RootState) => state.form.title);
  const formDescription = useSelector((state: RootState) => state.form.description);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form className={cx("container")} onSubmit={handleFormSubmit}>
      <div className={cx("header")}>
        <div className={cx("topBorder")} />
        <div className={cx("formMeta")}>
          <h1 className={cx("formTitle")}>{formTitle}</h1>
          <p className={cx("formDescription")}>{formDescription}</p>
        </div>
        <div className={cx("separator")} />
        {/* 아래 영역은 구현 외 영역이라 기능은 구현하지 않습니다.  */}
        <div className={cx("user")}>
          <div className={cx("account")}>
            <p className={cx("accountText")}>dudqn136@naver.com</p>
            <button className={cx("accountButton")}>계정 전환</button>
          </div>
          <button className={cx("cloudButton")}>
            <Icon type="cloud" size="small" />
          </button>
          <button className={cx("mailButton")}>
            <Icon type="mail" size="xsmall" />
            <p>비공개</p>
          </button>
        </div>
      </div>
      <div className={cx("questions")}></div>
      <div className={cx("footer")}>
        <button className={cx("submitButton")}>제출</button>
        <button className={cx("resetButton")}>양식 지우기</button>
      </div>
    </form>
  );
};

export default ViewForm;
