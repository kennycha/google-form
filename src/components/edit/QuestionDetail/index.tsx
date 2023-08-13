import { QuestionTypes } from "../../../types";
import CheckboxQuestionDetail from "./CheckboxQuestionDetail";
import ChoiceQuestionDetail from "./ChoiceQuestionDetail";
import DescriptiveQuestionDetail from "./DescriptiveQuestionDetail";
import DropdownQuestionDetail from "./DropdownQuestionDetail";
import ShortQuestionDetail from "./ShortQuestionDetail";

interface QuestionDetailProps {
  type: QuestionTypes;
  options?: { value: string; text: string }[];
}

const QuestionDetail = ({ type, options = [] }: QuestionDetailProps) => {
  switch (type) {
    case "short": {
      return <ShortQuestionDetail />;
    }
    case "descriptive": {
      return <DescriptiveQuestionDetail />;
    }
    case "choice": {
      return <ChoiceQuestionDetail options={options} />;
    }
    case "checkbox": {
      return <CheckboxQuestionDetail options={options} />;
    }
    case "dropdown": {
      return <DropdownQuestionDetail options={options} />;
    }
  }
};

export default QuestionDetail;
