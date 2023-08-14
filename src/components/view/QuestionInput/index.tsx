import { useDispatch } from "react-redux";
import { Question } from "../../../types";
import { checkHasMultipleAnswer } from "../../../utils";
import QuestionCheckboxInput from "./QuestionCheckboxInput";
import QuestionChoiceInput from "./QuestionChoiceInput";
import QuestionDescriptiveInput from "./QuestionDescriptiveInput";
import QuestionDropdownInput from "./QuestionDropdownInput";
import QuestionShortInput from "./QuestionShortInput";
import { changeSingleAnswer } from "../../../features/form";

type QuestionInputProps = { question: Question };

const QuestionInput = ({ question }: QuestionInputProps) => {
  const dispatch = useDispatch();

  const onAnswerReset = () => {
    console.log("reset");
  };

  if (checkHasMultipleAnswer(question)) {
    const onAnswerChange = (value: string) => {
      console.log("questionId: ", question.id);
      console.log("value: ", value);
    };

    return <QuestionCheckboxInput />;
  } else {
    const onAnswerChange = (value: string) => {
      dispatch(changeSingleAnswer({ questionId: question.id, value }));
    };

    switch (question.type) {
      case "short": {
        return <QuestionShortInput answer={question.answer} onAnswerChange={onAnswerChange} />;
      }
      case "descriptive": {
        return <QuestionDescriptiveInput answer={question.answer} onAnswerChange={onAnswerChange} />;
      }
      case "choice": {
        return <QuestionChoiceInput />;
      }
      case "dropdown": {
        return <QuestionDropdownInput />;
      }
    }
  }
};

export default QuestionInput;
