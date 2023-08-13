import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import DeleteButton from "../../../common/DeleteButton";
import Icon from "../../../common/Icon";
import { Nullable } from "../../../../types";

const cx = classNames.bind(styles);

interface ChoiceQuestionDetailProps {
  options: { id: string; value: string }[];
}

const ChoiceQuestionDetail = ({ options }: ChoiceQuestionDetailProps) => {
  const [currentOptionId, setCurrentOptionId] = useState<Nullable<string>>(null);

  const canDeleteOption = useMemo(() => options.length > 1, [options.length]);
  const hasEtc = useMemo(() => options.find((option) => option.id === "etc"), [options]);

  const handleInputFocus = (id: string) => {
    setCurrentOptionId(id);
  };

  const handleInputBlur = (id: string, value: string) => {
    const duplicated = options.find((option) => option.id !== id && option.value === value);
    if (duplicated) {
      console.log("기본값 부여");
    } else {
      console.log("값 변경");
    }
    setCurrentOptionId(null);
  };

  const handleInputChange = (id: string, value: string) => {
    // @TODO redux 연결
    const duplicated = options.find((option) => option.id !== id && option.value === value);
    if (duplicated) {
      console.log("기본값 부여");
    } else {
      console.log("값 변경");
    }
  };

  const handleDeleteButtonClick = (id: string) => {
    // @TODO id 사용해서 옵션 삭제
    console.log(`delete ${id}`);
  };

  return (
    <div className={cx("container")}>
      <ul className={cx("options")}>
        {options.map((option, idx) => {
          // 중복되는 경우 뒤에 있는 옵션에 표시하기 위해 id가 아닌 index를 사용
          const duplicated = options.findIndex((opt) => opt.value === option.value) !== idx;

          return (
            <li className={cx("option")} key={option.id}>
              <div className={cx("circle")} />
              <div className={cx("optionContent")}>
                <div className={cx("optionContentInner")}>
                  <input
                    className={cx("optionText")}
                    type="text"
                    value={option.value}
                    onFocus={() => handleInputFocus(option.id)}
                    onBlur={(event) => handleInputBlur(option.id, event.target.value)}
                    onChange={(event) => handleInputChange(option.id, event.target.value)}
                  />
                  <div className={cx("underline", { focus: option.id === currentOptionId, duplicated })} />
                </div>
                {duplicated && <Icon type="alert" />}
                {/* 아래 영역은 구현 외 영역이라 기능은 구현하지 않습니다.  */}
                <button className={cx("uploadButton", { focus: option.id === currentOptionId })}>
                  <Icon type="image" />
                </button>
              </div>
              {canDeleteOption && <DeleteButton onClick={() => handleDeleteButtonClick(option.id)} />}
            </li>
          );
        })}
      </ul>
      <div className={cx("buttons")}>
        <div className={cx("circle")} />
        <div className={cx("addButton")}>
          <p>옵션 추가</p>
        </div>
        {!hasEtc && (
          <>
            <p>또는</p>
            <div className={cx("etcButton")}>
              <p>'기타' 추가</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChoiceQuestionDetail;
