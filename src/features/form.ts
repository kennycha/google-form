import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Form, QuestionOption, QuestionTypes } from "../types";
import { getRandomId } from "../utils";
import { ETC_OPTION_ID } from "../constants";

export type FormState = Form;

const initialState: FormState = {
  title: "제목 없는 설문지",
  description: "",
  questions: [
    {
      id: getRandomId(),
      title: "제목 없는 질문",
      type: "choice",
      options: [{ id: getRandomId(), value: "옵션 1" }],
      required: false,
    },
  ],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    changeFormTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeFormDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state) => {
      state.questions.push({
        id: getRandomId(),
        title: "",
        type: "choice",
        options: [{ id: getRandomId(), value: "옵션 1" }],
        required: false,
      });
    },
    duplicateQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
      const idx = state.questions.findIndex((question) => question.id === action.payload.questionId);
      if (idx === -1) return;
      const { title, type, options, required } = state.questions[idx];
      const newQuestion = {
        id: getRandomId(),
        title,
        type,
        options: options.map((option) => ({ ...option, id: getRandomId() })),
        required,
      };
      state.questions = [...state.questions.slice(0, idx), newQuestion, ...state.questions.slice(idx)];
    },
    deleteQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
      state.questions = state.questions.filter((question) => question.id !== action.payload.questionId);
    },
    changeQuestionTitle: (state, action: PayloadAction<{ questionId: string; value: string }>) => {
      const { questionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.title = value;
    },
    changeQuestionType: (state, action: PayloadAction<{ questionId: string; value: QuestionTypes }>) => {
      const { questionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.type = value;
      if (value === "short" || value === "descriptive") {
        targetQuestion.options = [{ id: getRandomId(), value: "옵션 1" }];
      }
    },
    toggleQuestionRequired: (state, action: PayloadAction<{ questionId: string }>) => {
      const targetQuestion = state.questions.find((question) => question.id === action.payload.questionId);
      if (!targetQuestion) return;
      targetQuestion.required = !targetQuestion.required;
    },
    addOption: (state, action: PayloadAction<{ questionId: string; isEtc?: boolean }>) => {
      const { questionId, isEtc = false } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.options.push({
        id: isEtc ? ETC_OPTION_ID : getRandomId(),
        value: isEtc
          ? "기타..."
          : `옵션 ${targetQuestion.options.filter((option) => option.id !== ETC_OPTION_ID).length + 1}`,
      });
    },
    deleteOption: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const { questionId, optionId } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.options = targetQuestion.options.filter((option) => option.id !== optionId);
    },
    changeOptionValue: (state, action: PayloadAction<{ questionId: string; optionId: string; value: string }>) => {
      const { questionId, optionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      const targetOption = targetQuestion.options.find((option) => option.id === optionId);
      if (!targetOption) return;
      targetOption.value = value;
    },
    changeManualAnswer: (state, action: PayloadAction<{ questionId: string; value: string }>) => {
      const { questionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.answer = value;
    },
    changeSingleAnswer: (state, action: PayloadAction<{ questionId: string; value: QuestionOption }>) => {
      const { questionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.answer = value;
    },
    changeMultipleAnswer: (state, action: PayloadAction<{ questionId: string; value: QuestionOption[] }>) => {
      const { questionId, value } = action.payload;
      const targetQuestion = state.questions.find((question) => question.id === questionId);
      if (!targetQuestion) return;
      targetQuestion.answer = value;
    },
    resetAnswer: (state, action: PayloadAction<{ questionId: string }>) => {
      const targetQuestion = state.questions.find((question) => question.id === action.payload.questionId);
      if (!targetQuestion) return;
      targetQuestion.answer = undefined;
    },
    resetAllAnswers: (state) => {
      state.questions.forEach((question) => {
        question.answer = undefined;
      });
    },
  },
});

export const {
  changeFormTitle,
  changeFormDescription,
  addQuestion,
  duplicateQuestion,
  deleteQuestion,
  changeQuestionTitle,
  changeQuestionType,
  toggleQuestionRequired,
  addOption,
  deleteOption,
  changeOptionValue,
  changeManualAnswer,
  changeSingleAnswer,
  changeMultipleAnswer,
  resetAnswer,
  resetAllAnswers,
} = formSlice.actions;

export default formSlice.reducer;
