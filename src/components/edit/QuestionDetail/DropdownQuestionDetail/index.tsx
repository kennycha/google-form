import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import DeleteButton from "../../../common/DeleteButton";
import Icon from "../../../common/Icon";
import { Nullable, QuestionOption } from "../../../../types";
import { useDispatch } from "react-redux";
import { addOption, changeOptionValue, deleteOption } from "../../../../features/form";

const cx = classNames.bind(styles);

interface DropdownQuestionDetailProps {
  id: string;
  options: QuestionOption[];
}

const DropdownQuestionDetail = ({ id: questionId, options }: DropdownQuestionDetailProps) => {
  const dispatch = useDispatch();

  const [currentOptionId, setCurrentOptionId] = useState<Nullable<string>>(null);

  const canDeleteOption = useMemo(() => options.length > 1, [options.length]);

  const handleInputFocus = (optionId: string) => {
    setCurrentOptionId(optionId);
  };

  const handleInputBlur = (optionId: string, value: string, idx: number) => {
    const duplicated = options.find((option) => option.id !== optionId && option.value === value);
    if (duplicated) {
      dispatch(changeOptionValue({ questionId, optionId, value: `옵션 ${idx + 1}` }));
    } else {
      dispatch(changeOptionValue({ questionId, optionId, value }));
    }
    setCurrentOptionId(null);
  };

  const handleInputChange = (optionId: string, value: string) => {
    dispatch(changeOptionValue({ questionId, optionId, value }));
  };

  const handleDeleteButtonClick = (optionId: string) => {
    dispatch(deleteOption({ questionId, optionId }));
  };

  const handleAddButtonClick = () => {
    dispatch(addOption({ questionId }));
  };

  return (
    <div className={cx("container")}>
      <ul className={cx("options")}>
        {options.map((option, idx) => {
          const duplicated =
            option.id === currentOptionId
              ? options.filter((opt) => opt.id !== currentOptionId && opt.value === option.value).length > 0
              : options.findIndex((opt) => opt.value === option.value) !== idx;

          return (
            <li className={cx("option")} key={option.id}>
              <div className={cx("order")}>{idx + 1}</div>
              <div className={cx("optionContent")}>
                <div className={cx("optionContentInner")}>
                  <input
                    className={cx("optionText")}
                    type="text"
                    value={option.value}
                    onFocus={() => handleInputFocus(option.id)}
                    onBlur={(event) => handleInputBlur(option.id, event.target.value, idx)}
                    onChange={(event) => handleInputChange(option.id, event.target.value)}
                  />
                  <div className={cx("underline", { focus: option.id === currentOptionId, duplicated })} />
                </div>
                {duplicated && <Icon type="alert" />}
              </div>
              {canDeleteOption && <DeleteButton onClick={() => handleDeleteButtonClick(option.id)} />}
            </li>
          );
        })}
      </ul>
      <div className={cx("buttons")}>
        <div className={cx("order")}>{options.length + 1}</div>
        <div className={cx("addButton")} onClick={handleAddButtonClick}>
          <p>옵션 추가</p>
        </div>
      </div>
    </div>
  );
};

export default DropdownQuestionDetail;
