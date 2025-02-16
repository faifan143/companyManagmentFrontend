/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import GridContainer from "@/components/common/atoms/ui/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useLanguage from "@/hooks/useLanguage";
import PendingLogic from "@/components/common/atoms/ui/PendingLogic";
import useQueryData from "@/hooks/useQueryPageData";
import { templateType } from "@/types/new-template.type";
import { addDurationToDate } from "@/utils/add_duration_to_date";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormFields {
  start_date: string;
  fields: Record<string, string | number | File>;
}

const NewTransaction = () => {
  const { t, getDir } = useLanguage();
  const router = useRouter();

  const { reset, register, handleSubmit, watch } = useForm<FormFields>();
  // @ts-ignore
  const template = useQueryData<templateType>(reset);

  const [endDate, setEndDate] = useState<string>("");

  const startDate = watch("start_date");
  const durationUnit = template?.duration?.unit;

  useEffect(() => {
    if (startDate && template?.duration) {
      const calculatedEnd = addDurationToDate(
        startDate,
        template.duration,
        getDir
      );
      setEndDate(calculatedEnd);
    }
  }, [getDir, startDate, template]);

  const { mutateAsync: createTransaction, isPending } = useCreateMutation({
    endpoint: "/transactions",
    invalidateQueryKeys: ["transactions"],
    requestType: "post",
    onSuccessFn: () => {
      router.back();
    },
  });
  const onSubmit = (data: FormFields) => {
    if (!template) return;

    const formattedData = {
      template_id: template._id,
      start_date: data.start_date,
      fields: Object.entries(data.fields).map(([key, value]) => ({
        field_name: key,
        value: value,
      })),
    };

    console.log("Transaction Submitted:", formattedData);
    createTransaction(formattedData);
  };

  const getStartDateInputType = () => {
    switch (durationUnit) {
      case "days":
        return "date";
      case "hours":
        return "datetime-local";
      case "months":
        return "month";
      default:
        return "date";
    }
  };

  if (!template) return null;

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-3xl font-bold text-twhite text-center pb-4">
          {t("New Transaction")}
        </h1>
      </div>

      <div className="col-span-full mb-6">
        <div className="p-6 rounded-lg border border-gray-600 bg-secondary shadow-md text-twhite">
          <h2 className="text-2xl font-semibold mb-2">{template.name}</h2>
          <p className="text-tmid mb-4">{template.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-tmid">
                <span className="font-medium text-twhite">{t("Type")}: </span>
                {template.type}
              </p>
              <p className="text-sm text-tmid">
                <span className="font-medium text-twhite">
                  {t("Duration")}:{" "}
                </span>
                {template.duration.value} {t(template.duration.unit)}
              </p>
            </div>
            <div className="space-y-2">
              {startDate && (
                <p className="text-sm text-tmid" dir={getDir()}>
                  <span className="font-medium text-twhite">
                    {t("End Date")}:{" "}
                  </span>
                  {endDate}
                </p>
              )}
              {template.needAdminApproval && (
                <p className="text-sm text-tmid">
                  <span className="font-medium text-twhite">
                    {t("Admin Approval")}:{" "}
                  </span>
                  {t("Required")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="col-span-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date Input */}
          <div>
            <label className="block text-sm font-medium text-twhite mb-2">
              {t("Start Date")}
            </label>
            <input
              {...register("start_date", { required: true })}
              type={getStartDateInputType()}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200"
            />
          </div>

          {/* Transaction Fields */}
          {template.transactionFields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-twhite mb-2">
                {field.name}
              </label>
              {field.type === "text" && (
                <input
                  {...register(`fields.${field.name}`)}
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  {...register(`fields.${field.name}`)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200"
                />
              )}
              {field.type === "number" && (
                <input
                  {...register(`fields.${field.name}`)}
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200"
                />
              )}
              {field.type === "file" && (
                <input
                  {...register(`fields.${field.name}`)}
                  type="file"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-dark file:text-twhite hover:file:bg-dark/90"
                />
              )}
              {field.type === "select" && (
                <select
                  {...register(`fields.${field.name}`)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-secondary text-twhite focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-200"
                >
                  <option value="">{t("Select an option")}</option>
                  <option value="low">{t("Low")}</option>
                  <option value="medium">{t("Medium")}</option>
                  <option value="high">{t("High")}</option>
                </select>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-dark hover:bg-dark/90 text-twhite px-6 py-3 rounded-lg transition duration-200 font-medium"
        >
          <PendingLogic
            isPending={isPending}
            normalText={"Create Transaction"}
            pendingText={"Submitting . . ."}
          />
        </button>
      </form>
    </GridContainer>
  );
};

export default NewTransaction;
