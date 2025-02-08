import useLanguage from "@/hooks/useLanguage";
import { Option, TransactionField } from "@/types/new-template.type";
import { Dispatch, SetStateAction } from "react";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { CustomSelect } from "../CustomSelect";
import Image from "next/image";
import { TrashIcon } from "@/assets";

const TransactionFields = ({
  transactionFields,
  setTransactionFields,
}: {
  transactionFields: TransactionField[];
  setTransactionFields: Dispatch<SetStateAction<TransactionField[]>>;
}) => {
  const { t } = useLanguage();

  const fieldTypes: Option[] = [
    { value: "text", label: t("Text") },
    { value: "textarea", label: t("Textarea") },
    { value: "number", label: t("Number") },
    { value: "file", label: t("File") },
    { value: "select", label: t("Select Menu") },
  ];

  const handleAddField = () => {
    setTransactionFields((prev) => [
      ...prev,
      { name: "", type: "text", required: false },
    ]);
  };

  const handleRemoveField = (index: number) => {
    setTransactionFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdditionalFieldChange = (
    index: number,
    field: keyof TransactionField,
    value: string | boolean
  ) => {
    setTransactionFields((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-twhite">
          {t("Transactions Fields")}
        </h3>
        <CustomButton type="button" onClick={handleAddField}>
          {t("Add Field")}
        </CustomButton>
      </div>

      <div className="space-y-4">
        {transactionFields.map((field, index) => (
          <div
            key={index}
            className="flex w-full gap-4 items-end border border-gray-200 dark:border-gray-700 p-4 rounded-lg"
          >
            <div className="flex-1">
              <CustomInput
                className="w-full"
                label={t("Field Name")}
                value={field.name}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "name", e.target.value)
                }
                placeholder={t("Enter field name")}
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                className="w-full"
                label={t("Field Type")}
                value={field.type}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "type",
                    e.target.value as TransactionField["type"]
                  )
                }
                options={fieldTypes}
                placeholder={t("Field Type")}
              />
            </div>
            <CustomButton
              type="button"
              onClick={() => handleRemoveField(index)}
              className="!bg-red-500 hover:!bg-red-400 !text-white w-24 flex items-center justify-center"
            >
              <Image
                src={TrashIcon}
                alt="icon"
                width={25}
                height={25}
                quality={100}
              />
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionFields;
