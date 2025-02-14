import useLanguage from "@/hooks/useLanguage";
import { templateType } from "@/types/new-template.type";
import React, { useEffect, useRef } from "react";

interface TemplateDetailsModalProps {
  template: templateType;
  isOpen: boolean;
  onClose: () => void;
  getDeptNameById: (id: string) => string;
}

const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  template,
  isOpen,
  onClose,
  getDeptNameById,
}) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-secondary w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg overflow-hidden animate-in fade-in duration-200"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-start p-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-2xl font-semibold text-twhite mb-2">
              {template.name}
            </h2>
            <span className="px-3 py-1 text-xs rounded-full bg-main text-tmid border border-main">
              {t(template.type)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-tmid"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-8rem)]">
          <p className="text-tmid mb-6">{template.description}</p>

          <div className="space-y-6">
            {/* Duration & Admin Approval */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark rounded-lg p-4">
                <h3 className="text-sm font-medium text-twhite mb-2">
                  {t("Duration")}
                </h3>
                <p className="text-lg text-tmid">
                  {template.duration.value} {t(template.duration.unit)}
                </p>
              </div>
              <div className="bg-dark rounded-lg p-4">
                <h3 className="text-sm font-medium text-twhite mb-2">
                  {t("Admin Approval")}
                </h3>
                <p className="text-lg text-tmid">
                  {template.needAdminApproval
                    ? t("Required")
                    : t("Not Required")}
                </p>
              </div>
            </div>

            {/* Approval Track */}
            <div>
              <h3 className="text-sm font-medium text-twhite mb-3">
                {t("Approval Track")} (
                {template.departments_approval_track.length} {t("steps")})
              </h3>
              <div className="bg-dark rounded-lg p-4">
                <div className="flex flex-col gap-2">
                  {template.departments_approval_track.map((deptId, index) => (
                    <div key={deptId} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-main text-tmid flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-tmid">
                        {getDeptNameById(deptId)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution Departments */}
            <div>
              <h3 className="text-sm font-medium text-twhite mb-3">
                {t("Execution Departments")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.departments_execution_ids.map((deptId) => (
                  <span
                    key={deptId}
                    className="px-3 py-1.5 bg-main rounded-lg text-xs font-medium text-tmid"
                  >
                    {getDeptNameById(deptId)}
                  </span>
                ))}
              </div>
            </div>

            {/* Required Fields */}
            <div>
              <h3 className="text-sm font-medium text-twhite mb-3">
                {t("Required Fields")} ({template.transactionFields.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {template.transactionFields.map((field) => (
                  <div key={field.name} className="bg-dark p-3 rounded-lg">
                    <p className="text-sm font-medium text-twhite">
                      {field.name}
                    </p>
                    <p className="text-xs text-tmid capitalize">
                      {t(field.type)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsModal;
