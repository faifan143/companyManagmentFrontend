// Modified FormData interface to match templateType
export interface FormData {
  name: string;
  type: string;
  description: string;
  departments_approval_track: string[];
  departments_execution_ids: string[];
  needAdminApproval: boolean;
  duration: {
    unit: "days" | "hours" | "months";
    value: number;
  };
  transactionFields: TransactionField[];
}

// Helper interfaces
export interface Option {
  value: string;
  label: string;
}

// Component Props interfaces
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
  placeholder?: string;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface TransactionField {
  name: string;
  type: "text" | "textarea" | "number" | "file" | "select";
}

export interface templateType {
  _id: string;
  name: string;
  type: string;
  description: string;
  duration: {
    unit: "days" | "hours" | "months";
    value: number;
  };
  departments_approval_track: string[];
  departments_execution_ids: string[];
  needAdminApproval: boolean;
  transactionFields: TransactionField[];
}

export interface transactionType {
  _id: string;
  template_id: templateType;
  start_date: string;
  fields: {
    field_name: string;
    value: string | number | File;
  }[];
  departments_approval_track: {
    department_id: string;
    status: "PENDING" | "ONGOING" | "CHECKING" | "DONE";
  }[];
  status:
    | "NOT_APPROVED"
    | "PARTIALLY_APPROVED"
    | "FULLY_APPROVED"
    | "ADMIN_APPROVED";
  logs: {
    department_id: string;
    finished_at: string;
    note: string;
  }[];
}
