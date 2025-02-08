// types.ts
export interface Duration {
  start: string;
  end: string;
}

export interface TransactionField {
  name: string;
  type: "text" | "textarea" | "number" | "file" | "select";
  required: boolean;
}

export interface FormData {
  name: string;
  type: string;
  description: string;
  departments: string;
  durationType: "days" | "hours";
  duration: Duration;
}

export interface Option {
  value: string;
  label: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder: string;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
