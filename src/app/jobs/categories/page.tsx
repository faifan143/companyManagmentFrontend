"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import JobCategoryContent from "@/components/common/molcules/JobCategoryContent";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useLanguage from "@/hooks/useLanguage";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";

const Category = () => {
  const { t } = useLanguage();
  const isAdmin = useRolePermissions("admin");
  const { loading, navigateWithLoading } = useNavigationWithLoading();
  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        {loading && <PageSpinner />}

        <h1 className="text-3xl font-bold text-twhite text-center ">
          {t("Job Categories Management")}
        </h1>
        {isAdmin && (
          <button
            className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
            onClick={() => {
              navigateWithLoading("/jobs/categories/add-category");
            }}
          >
            {t("Add Category")}
          </button>
        )}
      </div>
      <JobCategoryContent />
    </GridContainer>
  );
};

export default Category;
