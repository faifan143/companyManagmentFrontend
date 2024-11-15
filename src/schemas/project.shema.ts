import * as yup from "yup";

// Helper function to format date as "yyyy/MM/dd"
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

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
      return formatDate(date);
    }),
  endDate: yup
    .string()
    .required("End date is required")
    .transform((value, originalValue) => {
      if (!originalValue) return null;
      const date = new Date(originalValue);
      return formatDate(date);
    }),
});
