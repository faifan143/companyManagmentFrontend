import * as yup from "yup";
export const addTaskSchema = yup.object().shape({
  name: yup.string().required("Task name is required"),
  description: yup.string().required("Description is required"),
  task_type: yup.string().required("Task type is required"),
  priority: yup
    .number()
    .required("Priority is required")
    .typeError("Priority must be a number"),
  emp: yup.string().nullable(),
  department_id: yup.string().nullable(),
  status: yup.string().required("Task status is required"),
  due_date: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  files: yup.array().of(yup.string()),
  isRecurring: yup.boolean(),
  intervalInDays: yup.number().when("isRecurring", {
    is: true,
    then: (schema) =>
      schema
        .required("Interval in days is required")
        .min(1, "Interval must be at least 1 day"),
    otherwise: (schema) => schema.nullable(),
  }),
  end_date: yup.date().when("isRecurring", {
    is: true,
    then: (schema) =>
      schema.required("End date is required").typeError("Invalid date format"),
    otherwise: (schema) => schema.nullable(),
  }),
});

export const addTaskPopupSchema = yup.object().shape({
  name: yup.string().required("Task name is required"),
  description: yup.string().required("Description is required"),
  task_type: yup.string().required("Task type is required"),
  priority: yup
    .number()
    .required("Priority is required")
    .typeError("Priority must be a number"),
  emp: yup.string().nullable(),
  department_id: yup.string().nullable(),
  status: yup.string().required("Task status is required"),
  due_date: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  files: yup.array().of(yup.string()),
});

export const addTaskStatusSchema = yup.object().shape({
  name: yup.string().required("Task status name is required"),
  description: yup.string().required("Description is required"),
});

export const addTaskTypeSchema = yup.object().shape({
  name: yup.string().required("Task type name is required"),
  description: yup.string().required("Description is required"),
});
