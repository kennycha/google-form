export type Nullable<T> = T | null;

export type IconSizeTypes = "small" | "medium" | "large";

export type IconTypes =
  | "add"
  | "alert"
  | "checkbox"
  | "choice"
  | "copy"
  | "delete"
  | "descriptive"
  | "drag"
  | "dropdown"
  | "eye"
  | "image"
  | "more"
  | "section"
  | "short"
  | "text"
  | "upload"
  | "video";

export enum IconTopEnum {
  add = 9140,
  alert = 9088,
  checkbox = 4520,
  choice = 6908,
  copy = 1378,
  delete = 8412,
  descriptive = 7012,
  drag = 6158,
  dropdown = 52,
  eye = 1690,
  image = 4572,
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

export interface Question {
  id: string;
  title: string;
  type: QuestionTypes;
  options: QuestionOption[];
  required: boolean;
  answer?: string;
}

export interface Form {
  title: string;
  description: string;
  questions: Question[];
}
