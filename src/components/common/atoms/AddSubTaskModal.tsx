// add sub task modal

import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { addSubTaskSchema } from "@/schemas/task.schema";
import { EmployeeType } from "@/types/EmployeeType.type";
import { ReceiveTaskType } from "@/types/Task.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "./CustomizedSnackbars";

const AddSubTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  parentTask?: ReceiveTaskType;
}> = ({ isOpen, onClose, parentTask }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSubTaskSchema),
  });
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();

  const { data: employees } = useCustomQuery<EmployeeType[]>({
    queryKey: ["employees"],
    url: `http://${process.env.BASE_URL}/emp/get-all-emps`,
    setSnackbarConfig,
  });
  const { mutate: addSection, isPending } = useCreateMutation({
    endpoint: `/tasks/add-subtask/${parentTask?.id}`,
    onSuccessMessage: `SubTask Added successfully!`,
    invalidateQueryKeys: ["tasks"],
    setSnackbarConfig,
    onSuccessFn() {
      reset();
      setInterval(onClose, 1000);
    },
  });

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  z-50">
        <div className="bg-dark rounded-xl shadow-md w-[400px] text-white space-y-4 p-6 relative">
          <button
            onClick={onClose}
            className="text-white absolute top-4 right-4 text-xl"
          >
            &times;
          </button>
          <div>
            <form
              onSubmit={handleSubmit(async (data) => {
                addSection(data);
              })}
            >
              {/* Task Name Field */}
              <div>
                <label className="block text-slate-300   text-sm font-medium">
                  {t("Task Name")}
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none  rounded-lg  ${
                    errors.name ? "border border-red-500" : "border-none"
                  }`}
                  placeholder={t("Enter task name")}
                />

                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Description")}
                </label>
                <textarea
                  {...register("description")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none  rounded-lg  ${
                    errors.name ? "border border-red-500" : "border-none"
                  }`}
                  placeholder={t("Enter task description")}
                />
                {errors.description && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Priority Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Priority")}
                </label>
                <select
                  {...register("priority")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none  rounded-lg  ${
                    errors.name ? "border border-red-500" : "border-none"
                  }`}
                >
                  <option value="">{t("Select a priority ")}</option>
                  {["HIGH", "MEDIUM", "LOW"].map((priority, index) => (
                    <option className="" key={index} value={priority}>
                      {t(priority)}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              {/* Due Date Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Due Date")}
                </label>
                <input
                  type="date"
                  {...register("due_date")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none  rounded-lg  ${
                    errors.name ? "border border-red-500" : "border-none"
                  }`}
                />
                {errors.due_date && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.due_date.message}
                  </p>
                )}
              </div>

              {/* Employee Field */}
              {
                <div>
                  <label className="block text-slate-300 text-sm font-medium">
                    {t("Assigned Employee")}
                  </label>
                  <select
                    {...register("emp")}
                    className={`w-full px-4 py-2 mt-1 bg-secondary outline-none  rounded-lg  ${
                      errors.name ? "border border-red-500" : "border-none"
                    }`}
                  >
                    <option value="">{t("Select an employee")}</option>
                    {employees &&
                      employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                  </select>
                  {errors.emp && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.emp.message}
                    </p>
                  )}
                </div>
              }

              <button
                type="submit"
                className={`w-full py-2 mt-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition duration-200 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? t("Creating...") : t("Create SubTask")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default AddSubTaskModal;
