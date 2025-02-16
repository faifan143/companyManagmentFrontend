"use client";
import TemplateCard from "@/components/common/atoms/templates/TemplateCard";
import TemplateEmptyState from "@/components/common/atoms/templates/TemplateEmptyState";
import TemplateLoadingSkeleton from "@/components/common/atoms/templates/TemplateLoadingSkeleton";
import ErrorState from "@/components/common/atoms/ui/ErrorState";
import GridContainer from "@/components/common/atoms/ui/GridContainer";
import RouteWrapper from "@/components/common/atoms/ui/RouteWrapper";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { templateType } from "@/types/new-template.type";

const Templates = () => {
  const { t, getDir } = useLanguage();
  const isRTL = getDir() === "rtl";

  const {
    data: templates,
    isLoading,
    error,
    refetch,
  } = useCustomQuery<templateType[]>({
    url: "/templates",
    queryKey: ["templates"],
  });

  const renderContent = () => {
    if (error) {
      return (
        <ErrorState
          message={t("Failed to load templates")}
          showRetry={true}
          onRetry={refetch}
        />
      );
    }

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TemplateLoadingSkeleton key={`loading-${i}`} />
          ))}
        </div>
      );
    }

    if (!templates?.length) {
      return <TemplateEmptyState t={t} />;
    }

    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {templates.map((template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>
    );
  };

  return (
    <GridContainer>
      {/* Header Section */}
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <h1 className="text-3xl font-bold text-twhite">
          {t("Transaction Templates")}
        </h1>
        <RouteWrapper href="/templates/add-template">
          <button className="bg-secondary hover:bg-opacity-90 text-twhite px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {t("Add New Template")}
          </button>
        </RouteWrapper>
      </div>

      {/* Content Section */}
      {renderContent()}
    </GridContainer>
  );
};

export default Templates;
