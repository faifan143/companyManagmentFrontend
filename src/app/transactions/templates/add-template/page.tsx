"use client";
import { CustomButton } from "@/components/common/atoms/CustomButton";
import GridContainer from "@/components/common/atoms/GridContainer";
import BasicFields from "@/components/common/atoms/transactions-templates/BasicFields";
import TransactionFields from "@/components/common/atoms/transactions-templates/TransactionFields";
import useLanguage from "@/hooks/useLanguage";
import { TransactionField, FormData } from "@/types/new-template.type";
import React, { useState } from "react";

const NewTemplate: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
    departments: "",
    durationType: "days",
    duration: {
      start: "",
      end: "",
    },
  });

  const [transactionFields, setTransactionFields] = useState<
    TransactionField[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, transactionFields });
  };

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-3xl font-bold text-twhite text-center pb-4 ">
          {t("New Template")}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <BasicFields formData={formData} setFormData={setFormData} />
        {/* Additional Fields */}
        <TransactionFields
          transactionFields={transactionFields}
          setTransactionFields={setTransactionFields}
        />
        <CustomButton type="submit" className="w-full">
          {t("Create Template")}
        </CustomButton>
      </form>
    </GridContainer>
  );
};

export default NewTemplate;
