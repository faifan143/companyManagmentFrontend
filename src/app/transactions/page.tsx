"use client";
import TransactionCard from "@/components/common/atoms/transactions/TransactionCard";
import TransactionEmptyState from "@/components/common/atoms/transactions/TransactionEmptyState";
import TransactionLoadingSkeleton from "@/components/common/atoms/transactions/TransactionLoadingSkeleton";
import CustomReactSelect from "@/components/common/atoms/ui/CustomReactSelect";
import ErrorState from "@/components/common/atoms/ui/ErrorState";
import GridContainer from "@/components/common/atoms/ui/GridContainer";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { Option, transactionType } from "@/types/new-template.type";
import { useMemo, useState } from "react";
import { SingleValue } from "react-select";

type ViewType = "my" | "admin" | "department" | "execution";

const Transactions = () => {
  const { t } = useLanguage();
  const [viewType, setViewType] = useState<ViewType>("my");

  const viewOptions = useMemo(
    () => [
      { value: "my", label: t("My Transactions") },
      { value: "department", label: t("Department Transactions") },
      { value: "execution", label: t("Department Executions") },
      { value: "admin", label: t("Admin Approvals") },
    ],
    [t]
  );

  const selectedOption = useMemo(
    () => viewOptions.find((option) => option.value === viewType),
    [viewType, viewOptions]
  );

  // Queries with proper enabling
  const {
    data: deptTransactions,
    isLoading: isDeptLoading,
    isError: isDeptError,
  } = useCustomQuery<{
    checking: transactionType[];
    ongoing: transactionType[];
  }>({
    url: "/transactions/department-transactions",
    queryKey: ["department-transactions"],
    enabled: viewType === "department",
  });

  const {
    data: myTransactions,
    isLoading: isMyTransLoading,
    isError: isMyTransError,
  } = useCustomQuery<transactionType[]>({
    url: "/transactions/my-transactions",
    queryKey: ["my-transactions"],
    enabled: viewType === "my",
  });

  const {
    data: adminTransactions,
    isLoading: isAdminLoading,
    isError: isAdminError,
  } = useCustomQuery<transactionType[]>({
    url: "/transactions/admin-approval",
    queryKey: ["admin-transactions"],
    enabled: viewType === "admin",
  });

  const {
    data: executionTransactions,
    isLoading: isExecutionLoading,
    isError: isExecutionError,
  } = useCustomQuery<transactionType[]>({
    url: "/transactions/execution",
    queryKey: ["execution-transactions"],
    enabled: viewType === "execution",
  });

  const handleTypeChange = (newValue: SingleValue<Option>) => {
    if (newValue) {
      setViewType(newValue.value as ViewType);
    }
  };

  const renderTransactionGrid = (
    data: transactionType[] = [],
    isChecking: boolean
  ) => {
    if (data.length === 0) return <TransactionEmptyState t={t} />;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((transaction) => (
          <TransactionCard
            key={transaction._id}
            transaction={transaction}
            showActions={!isChecking}
            viewType={viewType}
          />
        ))}
      </div>
    );
  };

  const isLoading =
    viewType === "my"
      ? isMyTransLoading
      : viewType === "department"
      ? isDeptLoading
      : viewType === "admin"
      ? isAdminLoading
      : isExecutionLoading;

  const isError =
    viewType === "my"
      ? isMyTransError
      : viewType === "department"
      ? isDeptError
      : viewType === "admin"
      ? isAdminError
      : isExecutionError;

  const getLoadingCount = () => {
    switch (viewType) {
      case "department":
        return 4; // 2 each for checking and ongoing
      default:
        return 2;
    }
  };

  const renderContent = () => {
    if (isError) {
      return <ErrorState />;
    }

    if (isLoading) {
      return (
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-twhite mb-6">
              {viewType === "department" ? t("Checking") : t("Transactions")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(getLoadingCount())].map((_, i) => (
                <TransactionLoadingSkeleton key={`loading-${i}`} />
              ))}
            </div>
          </section>
        </div>
      );
    }

    switch (viewType) {
      case "department":
        return (
          <div className="space-y-12">
            {deptTransactions?.checking &&
              deptTransactions.checking.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-semibold text-twhite">
                      {t("Checking")}
                    </h2>
                    <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium">
                      {deptTransactions.checking.length}
                    </span>
                  </div>
                  {renderTransactionGrid(deptTransactions.checking, true)}
                </section>
              )}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold text-twhite">
                  {t("Ongoing")}
                </h2>
                {deptTransactions?.ongoing &&
                  deptTransactions.ongoing.length > 0 && (
                    <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium">
                      {deptTransactions.ongoing.length}
                    </span>
                  )}
              </div>
              {renderTransactionGrid(deptTransactions?.ongoing, false)}
            </section>
          </div>
        );

      case "execution":
        return (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-twhite">
                {t("Execution Tasks")}
              </h2>
              {executionTransactions && executionTransactions.length > 0 && (
                <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-medium">
                  {executionTransactions.length}
                </span>
              )}
            </div>
            {renderTransactionGrid(executionTransactions, false)}
          </section>
        );

      case "admin":
        return (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-twhite">
                {t("Admin Tasks")}
              </h2>
              {adminTransactions && adminTransactions.length > 0 && (
                <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-medium">
                  {adminTransactions.length}
                </span>
              )}
            </div>
            {renderTransactionGrid(adminTransactions, false)}
          </section>
        );

      default: // "my" transactions
        return (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-twhite">
                {t("My Transactions")}
              </h2>
              {myTransactions && myTransactions.length > 0 && (
                <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium">
                  {myTransactions.length}
                </span>
              )}
            </div>
            {renderTransactionGrid(myTransactions, false)}
          </section>
        );
    }
  };

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <h1 className="text-3xl font-bold text-twhite">
            {t("Transactions")}
          </h1>
          <div className="w-64">
            <CustomReactSelect
              value={selectedOption}
              options={viewOptions}
              onChange={handleTypeChange}
              isSearchable={false}
              menuPlacement="bottom"
              placeholder={t("Select view type")}
            />
          </div>
        </div>
      </div>
      {renderContent()}
    </GridContainer>
  );
};

export default Transactions;
