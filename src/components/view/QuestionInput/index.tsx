import { useDispatch } from "react-redux";
import { Question, QuestionOption } from "../../../types";
import { checkHasManualAnswer, checkHasSingleAnswer } from "../../../utils";
import QuestionCheckboxInput from "./QuestionCheckboxInput";
import QuestionChoiceInput from "./QuestionChoiceInput";
import QuestionDescriptiveInput from "./QuestionDescriptiveInput";
import QuestionDropdownInput from "./QuestionDropdownInput";
import QuestionShortInput from "./QuestionShortInput";
import { changeManualAnswer, changeMultipleAnswer, changeSingleAnswer, resetAnswer } from "../../../features/form";
import { memo } from "react";

type QuestionInputProps = { question: Question; hasError: boolean };

const QuestionInput = memo(({ question, hasError }: QuestionInputProps) => {
  const dispatch = useDispatch();

  if (checkHasManualAnswer(question)) {
    const onAnswerChange = (value: string) => {
      dispatch(changeManualAnswer({ questionId: question.id, value }));
    };

    const props = { answer: question.answer, onAnswerChange, hasError };

    return question.type === "short" ? <QuestionShortInput {...props} /> : <QuestionDescriptiveInput {...props} />;
  } else {
    const onAnswerReset = () => {
      dispatch(resetAnswer({ questionId: question.id }));
    };

    if (checkHasSingleAnswer(question)) {
      const onAnswerChange = (value: QuestionOption) => {
        dispatch(changeSingleAnswer({ questionId: question.id, value }));
      };

      const props = { options: question.options, answer: question.answer, onAnswerChange, onAnswerReset, hasError };

      return question.type === "choice" ? <QuestionChoiceInput {...props} /> : <QuestionDropdownInput {...props} />;
    } else {
      const onAnswerChange = (options: QuestionOption[]) => {
        dispatch(changeMultipleAnswer({ questionId: question.id, value: options }));
      };

      const props = { options: question.options, answer: question.answer, onAnswerChange, onAnswerReset, hasError };

      return <QuestionCheckboxInput {...props} />;
    }
  }
});

export default QuestionInput;
