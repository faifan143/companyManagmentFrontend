"use client";

// NewTemplate.tsx
import { CustomButton } from "@/components/common/atoms/CustomButton";
import GridContainer from "@/components/common/atoms/GridContainer";
import BasicFields from "@/components/common/atoms/transactions-templates/BasicFields";
import TransactionFields from "@/components/common/atoms/transactions-templates/TransactionFields";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useLanguage from "@/hooks/useLanguage";
import { FormData, TransactionField } from "@/types/new-template.type";
import React, { useState } from "react";

const NewTemplate: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
    departments_approval_track: [],
    departments_execution_ids: [],
    needAdminApproval: false,
    duration: {
      unit: "hours",
      value: 0,
    },
    transactionFields: [],
  });

  const { mutateAsync: createTemplate } = useCreateMutation({
    endpoint: "/templates",
    invalidateQueryKeys: ["templates"],
    requestType: "post",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    createTemplate(formData);
  };

  const handleTransactionFieldsChange = (fields: TransactionField[]) => {
    setFormData((prev) => ({
      ...prev,
      transactionFields: fields,
    }));
  };

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-3xl font-bold text-twhite text-center pb-4">
          {t("New Template")}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <BasicFields formData={formData} setFormData={setFormData} />
        <TransactionFields
          transactionFields={formData.transactionFields}
          setTransactionFields={handleTransactionFieldsChange}
        />
        <CustomButton type="submit" className="w-full">
          {t("Create Template")}
        </CustomButton>
      </form>
    </GridContainer>
  );
};

export default NewTemplate;
