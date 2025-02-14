"use client";
import GridContainer from "@/components/common/atoms/GridContainer";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { DepartmentType } from "@/types/DepartmentType.type";
import { transactionType } from "@/types/new-template.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import { addDurationToDate } from "./add-transaction/page";
import TemplateDetailsModal from "@/components/common/atoms/transactions-templates/TemplateDetailsModal";
import { useState } from "react";
import LogsModal from "@/components/common/atoms/transactions-templates/LogsModal";

const TransactionCard = ({
  transaction,
  departments,
}: {
  transaction: transactionType;
  departments?: { info: DepartmentType[]; tree: DeptTree[] };
}) => {
  const { t, getDir } = useLanguage();
  const [showTemplateDetails, setShowTemplateDetails] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const getDeptNameById = (id: string) => {
    return departments?.tree.find((dept) => dept.id === id)?.name || id;
  };

  const getStatusColor = (status: transactionType["status"]) => {
    switch (status) {
      case "NOT_APPROVED":
        return "bg-red-500/10 text-red-500";
      case "PARTIALLY_APPROVED":
        return "bg-yellow-500/10 text-yellow-500";
      case "FULLY_APPROVED":
        return "bg-green-500/10 text-green-500";
      case "ADMIN_APPROVED":
        return "bg-blue-500/10 text-blue-500";
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-6 border border-gray-700/50">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-twhite mb-2">
            {transaction.template_id.name}
          </h2>
          <p className="text-tmid text-sm">
            {transaction.template_id.description}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            transaction.status
          )}`}
        >
          {t(transaction.status)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          {/* Start Date */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-tmid">{t("Start Date")}:</span>
            <span className="text-twhite" dir={getDir()}>
              {new Date(transaction.start_date).toISOString().split("T")[0]}
            </span>
          </div>
          {/* End Date */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-tmid">{t("End Date")}:</span>
            <span className="text-twhite">
              {addDurationToDate(
                transaction.start_date,
                transaction.template_id.duration,
                getDir
              )}
            </span>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-3">
          {transaction.fields.map((field, index) => (
            <div key={index} className="bg-main rounded-lg p-3">
              <span className="text-xs text-tmid block mb-1">
                {field.field_name}
              </span>
              <span className="text-sm text-twhite">
                {typeof field.value === "string" ||
                typeof field.value === "number"
                  ? field.value.toString()
                  : "File Uploaded"}
              </span>
            </div>
          ))}
        </div>

        {/* Approval Track */}
        <div className="border-t border-gray-700/30 pt-4">
          <h3 className="text-sm font-medium text-twhite mb-3">
            {t("Approval Track")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {transaction.departments_approval_track.map((dept, index) => (
              <div
                key={index}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2
                  ${
                    dept.status === "DONE"
                      ? "bg-green-500/10 text-green-500"
                      : dept.status === "ONGOING"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : dept.status === "CHECKING"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}
              >
                <span>{getDeptNameById(dept.department_id)}</span>
                <span className="text-[10px] uppercase">{dept.status}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-3 border-t border-gray-700/30 pt-4">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-dark hover:bg-tblack text-tmid hover:text-twhite transition-colors duration-200 flex items-center gap-2"
            onClick={() => {
              // Add template details modal/drawer logic
              setShowTemplateDetails(true);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {t("Template Details")}
          </button>
          <TemplateDetailsModal
            template={transaction.template_id}
            isOpen={showTemplateDetails}
            onClose={() => setShowTemplateDetails(false)}
            getDeptNameById={getDeptNameById}
          />

          <button
            className="px-4 py-2 text-sm rounded-lg bg-dark hover:bg-tblack text-tmid hover:text-twhite transition-colors duration-200 flex items-center gap-2"
            onClick={() => {
              setShowLogs(true);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("View Logs")}
            {transaction.logs.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-main/20 text-xs">
                {transaction.logs.length}
              </span>
            )}
          </button>
          <LogsModal
            logs={transaction.logs}
            isOpen={showLogs}
            onClose={() => setShowLogs(false)}
            getDeptNameById={getDeptNameById}
          />
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-secondary rounded-xl p-6 animate-pulse">
    <div className="h-6 bg-main rounded w-1/3 mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-main rounded w-full"></div>
      <div className="h-4 bg-main rounded w-2/3"></div>
    </div>
    <div className="space-y-4">
      <div className="h-8 bg-main rounded"></div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-main rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

const EmptyState = ({ t }: { t: (key: string) => string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-secondary rounded-full p-6 mb-4">
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-medium text-twhite mb-2">
      {t("No Transactions Found")}
    </h3>
    <p className="text-tmid">{t("Start by creating a new transaction")}</p>
  </div>
);

const Transactions = () => {
  const { t } = useLanguage();
  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });

  const {
    data: transactions,
    isLoading,
    error,
  } = useCustomQuery<transactionType[]>({
    url: "/transactions",
    queryKey: ["transactions"],
  });

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <h1 className="text-3xl font-bold text-twhite">{t("Transactions")}</h1>
        <div className="flex items-center gap-4">
          {/* Add filters or action buttons here */}
        </div>
      </div>

      <>
        {error && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-500">{t("Error loading transactions")}</p>
          </div>
        )}
      </>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : transactions?.length === 0 ? (
        <EmptyState t={t} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {transactions?.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              departments={departments}
            />
          ))}

          <TransactionCard
            transaction={{
              _id: "65c4e2b1c0ef8dd2a0958abc",
              template_id: {
                _id: "65c4e2b1c0ef8dd2a0958123",
                name: "Equipment Purchase Request",
                type: "PURCHASE",
                description:
                  "Request for purchasing new office equipment or hardware with multi-department approval flow",
                duration: {
                  unit: "days",
                  value: 5,
                },
                departments_approval_track: [
                  "67a3c07327ca9719288fae68",
                  "67941e4e27ca9719288fa453",
                  "67941e2227ca9719288fa43d",
                ],
                departments_execution_ids: [
                  "67a3d3ac27ca9719288fb105",
                  "67a3cf6e27ca9719288fb04c",
                ],
                needAdminApproval: true,
                transactionFields: [
                  { name: "Equipment Name", type: "text" },
                  { name: "Quantity", type: "number" },
                  { name: "Estimated Cost", type: "number" },
                  { name: "Technical Specifications", type: "textarea" },
                  { name: "Vendor Quote", type: "file" },
                  { name: "Priority Level", type: "select" },
                ],
              },
              start_date: "2024-02-10T08:00:00.000Z",
              fields: [
                {
                  field_name: "Equipment Name",
                  value: "Dell XPS 15 Laptop",
                },
                {
                  field_name: "Quantity",
                  value: 3,
                },
                {
                  field_name: "Estimated Cost",
                  value: 5999.99,
                },
                {
                  field_name: "Technical Specifications",
                  value:
                    '- 12th Gen Intel Core i9\n- 32GB RAM\n- 1TB SSD\n- NVIDIA RTX 3050 Ti\n- 15.6" 4K OLED Touch Display',
                },
                {
                  field_name: "Priority Level",
                  value: "high",
                },
              ],
              departments_approval_track: [
                {
                  department_id: "67941e2227ca9719288fa43d",
                  status: "DONE",
                },
                {
                  department_id: "67941e4e27ca9719288fa453",
                  status: "ONGOING",
                },
                {
                  department_id: "67a3cf6e27ca9719288fb04c",
                  status: "PENDING",
                },
              ],
              status: "PARTIALLY_APPROVED",
              logs: [
                {
                  department_id: "67941e2227ca9719288fa43d",
                  finished_at: "2024-02-10T10:30:00.000Z",
                  note: "Technical specifications reviewed and approved. Equipment meets department standards.",
                },
                {
                  department_id: "67941e2227ca9719288fa43d",
                  finished_at: "2024-02-10T09:15:00.000Z",
                  note: "Initial review started. Checking compatibility with existing systems.",
                },
                {
                  department_id: "67941e4e27ca9719288fa453",
                  finished_at: "2024-02-11T11:20:00.000Z",
                  note: "Budget review in progress. Requesting additional vendor quotes for comparison.",
                },
                {
                  department_id: "67941e4e27ca9719288fa453",
                  finished_at: "2024-02-11T14:45:00.000Z",
                  note: "Preliminary budget check completed. Awaiting final approval from department head.",
                },
              ],
            }}
            departments={departments}
          />
        </div>
      )}
    </GridContainer>
  );
};

export default Transactions;
