"use client";
import GridContainer from "@/components/common/atoms/GridContainer";
import useLanguage from "@/hooks/useLanguage";

const Transactions = () => {
  const { t } = useLanguage();
  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-3xl font-bold text-twhite text-center pb-4">
          {t("Transactions")}
        </h1>
        {/* <div className="flex justify-center flex-wrap items-center gap-5">
          <RouteWrapper href="/transactions/add-transaction">
            <div className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200">
              {t("Add New Transaction")}
            </div>
          </RouteWrapper>
        </div> */}
      </div>
    </GridContainer>
  );
};

export default Transactions;
