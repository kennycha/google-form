import { memo, useMemo, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import DeleteButton from "../../../common/DeleteButton";
import Icon from "../../../common/Icon";
import { Nullable, QuestionOption } from "../../../../types";
import { ETC_OPTION_ID } from "../../../../constants";
import { useDispatch } from "react-redux";
import { addOption, changeOptionValue, deleteOption } from "../../../../features/form";

const cx = classNames.bind(styles);

interface ChoiceQuestionDetailProps {
  id: string;
  options: QuestionOption[];
  current: boolean;
}

const ChoiceQuestionDetail = memo(({ id: questionId, options, current }: ChoiceQuestionDetailProps) => {
  const dispatch = useDispatch();

  const [currentOptionId, setCurrentOptionId] = useState<Nullable<string>>(null);

  const canDeleteOption = useMemo(() => options.length > 1, [options.length]);
  const editableOptions = useMemo(() => options.filter((option) => option.id !== ETC_OPTION_ID), [options]);
  const etcOption = useMemo(() => options.find((option) => option.id === ETC_OPTION_ID), [options]);

  const handleInputFocus = (optionId: string) => {
    setCurrentOptionId(optionId);
  };

  const handleInputBlur = (optionId: string, value: string, idx: number) => {
    const duplicated = editableOptions.find((option) => option.id !== optionId && option.value === value);
    if (duplicated) {
      dispatch(changeOptionValue({ questionId, optionId, value: `옵션 ${idx + 1}` }));
    } else {
      dispatch(changeOptionValue({ questionId, optionId, value }));
    }
    setCurrentOptionId(null);
  };

  const handleInputChange = (optionId: string, value: string) => {
    const duplicated = editableOptions.find((option) => option.id !== optionId && option.value === value);
    if (!duplicated) {
      dispatch(changeOptionValue({ questionId, optionId, value }));
    }
  };

  const handleDeleteButtonClick = (optionId: string) => {
    dispatch(deleteOption({ questionId, optionId }));
  };

  const handleAddButtonClick = (isEtc = false) => {
    dispatch(addOption({ questionId, isEtc }));
  };

  return (
    <div className={cx("container")}>
      <ul className={cx("options")}>
        {editableOptions.map((option, idx) => {
          const duplicated =
            option.id === currentOptionId
              ? editableOptions.filter((opt) => opt.id !== currentOptionId && opt.value === option.value).length > 0
              : editableOptions.findIndex((opt) => opt.value === option.value) !== idx;

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
                    onBlur={(event) => handleInputBlur(option.id, event.target.value, idx)}
                    onChange={(event) => handleInputChange(option.id, event.target.value)}
                  />
                  <div className={cx("underline", { focus: option.id === currentOptionId, duplicated })} />
                </div>
                {duplicated && <Icon type="alert" />}
                <button className={cx("uploadButton", { focus: option.id === currentOptionId })}>
                  <Icon type="image" />
                </button>
              </div>
              {canDeleteOption && <DeleteButton onClick={() => handleDeleteButtonClick(option.id)} />}
            </li>
          );
        })}
        {etcOption && (
          <li className={cx("option")} key={etcOption.id}>
            <div className={cx("circle")} />
            <div className={cx("optionContent")}>
              <div className={cx("optionContentInner")}>
                <input className={cx("optionText", { etc: true })} type="text" value={etcOption.value} disabled />
                <div className={cx("underline")} />
              </div>
            </div>
            {canDeleteOption && <DeleteButton onClick={() => handleDeleteButtonClick(etcOption.id)} />}
          </li>
        )}
      </ul>
      {current && (
        <div className={cx("buttons")}>
          <div className={cx("circle")} />
          <div className={cx("addButton")} onClick={() => handleAddButtonClick()}>
            <p>옵션 추가</p>
          </div>
          {!etcOption && (
            <>
              <p>또는</p>
              <div className={cx("etcButton")} onClick={() => handleAddButtonClick(true)}>
                <p>'기타' 추가</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default ChoiceQuestionDetail;
