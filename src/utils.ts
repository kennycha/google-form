import { v4 as uuidv4 } from "uuid";
import { Question, QuestionWithMultipleAnswer } from "./types";

export const getRandomId = () => {
  return uuidv4();
};

export const checkHasMultipleAnswer = (question: Question): question is QuestionWithMultipleAnswer => {
  return question.type === "checkbox";
};
