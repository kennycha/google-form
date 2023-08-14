import { v4 as uuidv4 } from "uuid";
import { Question, QuestionWithManualAnswer, QuestionWithSingleAnswer } from "./types";

export const getRandomId = () => {
  return uuidv4();
};

export const checkHasManualAnswer = (question: Question): question is QuestionWithManualAnswer => {
  return question.type === "short" || question.type === "descriptive";
};

export const checkHasSingleAnswer = (question: Question): question is QuestionWithSingleAnswer => {
  return question.type === "choice" || question.type === "dropdown";
};
