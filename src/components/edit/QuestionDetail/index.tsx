import { QuestionTypes } from "../../../types";
import CheckboxQuestionDetail from "./CheckboxQuestionDetail";
import ChoiceQuestionDetail from "./ChoiceQuestionDetail";
import DescriptiveQuestionDetail from "./DescriptiveQuestionDetail";
import DropdownQuestionDetail from "./DropdownQuestionDetail";
import ShortQuestionDetail from "./ShortQuestionDetail";

interface QuestionDetailProps {
  id: string;
  type: QuestionTypes;
  options?: { id: string; value: string }[];
}

const QuestionDetail = ({ id, type, options = [] }: QuestionDetailProps) => {
  switch (type) {
    case "short": {
      return <ShortQuestionDetail />;
    }
    case "descriptive": {
      return <DescriptiveQuestionDetail />;
    }
    case "choice": {
      return <ChoiceQuestionDetail id={id} options={options} />;
    }
    case "checkbox": {
      return <CheckboxQuestionDetail id={id} options={options} />;
    }
    case "dropdown": {
      return <DropdownQuestionDetail id={id} options={options} />;
    }
  }
};

export default QuestionDetail;
