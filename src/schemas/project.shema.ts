import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addProjectSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  departments: yup.array().of(yup.string()).nullable(),
  members: yup.array().of(yup.string()).nullable(),

  startDate: yup
    .string()
    .required("Start date is required")
    .transform((value, originalValue) => {
      if (!originalValue) return null;
      const date = new Date(originalValue);
      return date;
    }),
  endDate: yup
    .date()
    .required("End date is required")
    .transform((value, originalValue) => {
      if (!originalValue) return null;

      const date = new Date(originalValue);
      return date;
    })
    .min(today, "Due date cannot be in the past"),
});
