import { memo } from "react";
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
  current: boolean;
}

const QuestionDetail = memo(({ id, type, options = [], current }: QuestionDetailProps) => {
  switch (type) {
    case "short": {
      return <ShortQuestionDetail />;
    }
    case "descriptive": {
      return <DescriptiveQuestionDetail />;
    }
    case "choice": {
      return <ChoiceQuestionDetail id={id} options={options} current={current} />;
    }
    case "checkbox": {
      return <CheckboxQuestionDetail id={id} options={options} current={current} />;
    }
    case "dropdown": {
      return <DropdownQuestionDetail id={id} options={options} current={current} />;
    }
  }
});

export default QuestionDetail;
