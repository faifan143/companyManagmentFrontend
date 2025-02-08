"use client";
import GridContainer from "@/components/common/atoms/GridContainer";
import useLanguage from "@/hooks/useLanguage";
import { useForm } from "react-hook-form";
import React from "react";
import useQueryData from "@/hooks/useQueryPageData";

const NewTransaction = () => {
  const { t } = useLanguage();
  const { reset, register, handleSubmit } = useForm();
  const transactionData = useQueryData(reset);

  const onSubmit = (data: any) => {
    console.log("Transaction Submitted:", data);
  };

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-3xl font-bold text-twhite text-center pb-4">
          {t("New Transaction")}
        </h1>
      </div>

      <div>
        {transactionData && (
          <div className="p-6 rounded-lg border border-gray-600 bg-secondary shadow-md text-twhite mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {transactionData.name}
            </h2>
            <p className="text-tmid mb-2">{transactionData.description}</p>
            <p className="text-sm text-tmid">
              <strong>{t("Type")}: </strong> {transactionData.type}
            </p>
            <p className="text-sm text-tmid">
              <strong>{t("Duration")}: </strong>{" "}
              {transactionData.duration.start} - {transactionData.duration.end}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {transactionData?.transactionFields?.map(
          (field: any, index: number) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-400 mb-1">{field.name}</label>
              {field.type === "text" && (
                <input
                  {...register(field.name)}
                  type="text"
                  className="w-full p-2 border border-gray-600 rounded-md bg-secondary text-twhite"
                />
              )}
              {field.type === "number" && (
                <input
                  {...register(field.name)}
                  type="number"
                  className="w-full p-2 border border-gray-600 rounded-md bg-secondary text-twhite"
                />
              )}
              {field.type === "date" && (
                <input
                  {...register(field.name)}
                  type="date"
                  className="w-full p-2 border border-gray-600 rounded-md bg-secondary text-twhite"
                />
              )}
              {field.type === "select" && (
                <select
                  {...register(field.name)}
                  className="w-full p-2 border border-gray-600 rounded-md bg-secondary text-twhite"
                >
                  <option>{t("Select an option")}</option>
                </select>
              )}
            </div>
          )
        )}
        <button
          type="submit"
          className="mt-4 bg-dark text-twhite px-4 py-2 rounded-md hover:bg-secondary transition duration-200 w-full"
        >
          {t("Submit Transaction")}
        </button>
      </form>
    </GridContainer>
  );
};

export default NewTransaction;
