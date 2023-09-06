import { useDispatch, useSelector } from "react-redux";
import Logo from "../../resources/logo.svg";
import Icon from "../common/Icon";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { RootState } from "../../store";
import { changeMode } from "../../features/app";
import { memo, useMemo } from "react";
import { resetAllAnswers } from "../../features/form";

const cx = classNames.bind(styles);

const Header = memo(() => {
  const formTitle = useSelector((state: RootState) => state.form.title);
  const mode = useSelector((state: RootState) => state.app.mode);
  const isViewMode = useMemo(() => mode === "view", [mode]);

  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    dispatch(changeMode());
    dispatch(resetAllAnswers());
  };

  const onPreviewButtonClick = () => {
    dispatch(changeMode());
    dispatch(resetAllAnswers());
  };

  return (
    // 실제 Google Form에서는 View 모드에 Header가 없지만, 모드 변경 버튼을 위치시키기 위해 유지했습니다.
    <header className={cx("container", { view: isViewMode })}>
      {isViewMode ? (
        <button className={cx("back")} onClick={onBackButtonClick}>
          <Icon type={"back"} />
        </button>
      ) : (
        <>
          <div className={cx("logoWrapper")}>
            <img className={cx("logo")} src={Logo} />
          </div>
          <div className={cx("menus")}>
            <button className={cx("preview")} onClick={onPreviewButtonClick}>
              <Icon type={"eye"} />
            </button>
            {/* 아래 요소는 구현 외 요소라 기능은 구현하지 않습니다.  */}
            <button className={cx("profile")}>
              <p className={cx("profileText")}>영부</p>
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
        </>
      )}
    </header>
  );
});

export default Header;
