export type Nullable<T> = T | null;

export type IconSizeTypes = "xsmall" | "small" | "medium" | "large";

export type IconTypes =
  | "add"
  | "alert"
  | "back"
  | "checkbox"
  | "choice"
  | "cloud"
  | "copy"
  | "delete"
  | "descriptive"
  | "drag"
  | "dropdown"
  | "error"
  | "eye"
  | "image"
  | "mail"
  | "more"
  | "section"
  | "short"
  | "text"
  | "upload"
  | "video";

export enum IconTopEnum {
  add = 9140,
  alert = 9088,
  back = 7506,
  checkbox = 4520,
  choice = 6908,
  cloud = 2024,
  copy = 1378,
  delete = 8412,
  descriptive = 7012,
  drag = 6158,
  dropdown = 52,
  error = 2232,
  eye = 1690,
  image = 4572,
  mail = 1768,
  more = 0,
  section = 3350,
  short = 2596,
  text = 4650,
  upload = 1222,
  video = 6418,
}

export type QuestionTypes = "short" | "descriptive" | "choice" | "checkbox" | "dropdown";

export interface QuestionOption {
  id: string;
  value: string;
}

export type Question = QuestionWithSingleAnswer | QuestionWithMultipleAnswer;

export interface QuestionWithSingleAnswer {
  id: string;
  title: string;
  type: Omit<QuestionTypes, "checkbox">;
  options: QuestionOption[];
  required: boolean;
  answer?: string;
}

export interface QuestionWithMultipleAnswer {
  id: string;
  title: string;
  type: "checkbox";
  options: QuestionOption[];
  required: boolean;
  answer?: string[];
}

export interface Form {
  title: string;
  description: string;
  questions: Question[];
}
