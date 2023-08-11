import Logo from "../../resources/logo.svg";
import { IconTopEnum } from "../../types";
import Icon from "../common/Icon";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Header = () => {
  const formTitle = "제목 없는 설문지";

  return (
    <header className={cx("container")}>
      <div className={cx("logoWrapper")}>
        <img className={cx("logo")} src={Logo} />
      </div>
      <div className={cx("menus")}>
        <button className={cx("preview")}>
          <Icon top={IconTopEnum.eye} />
        </button>
      </div>
      <div className={cx("title")}>{formTitle}</div>
      {/* 아래 영역은 구현 외 영역이라 기능은 구현하지 않습니다.  */}
      <div className={cx("tabs")}>
        <div className={cx("tab", { current: true })}>
          <p className={cx("tabText")}>질문</p>
          <div className={cx("tabBottom")} />
        </div>
        <div className={cx("tab")}>
          <p className={cx("tabText")}>응답</p>
        </div>
        <div className={cx("tab")}>
          <p className={cx("tabText")}>설정</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
