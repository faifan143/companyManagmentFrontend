import useLanguage from "@/hooks/useLanguage";
import { transactionType } from "@/types/new-template.type";
import React, { useEffect, useRef } from "react";

interface LogsModalProps {
  logs: transactionType["logs"];
  isOpen: boolean;
  onClose: () => void;
  getDeptNameById: (id: string) => string;
}

const LogsModal: React.FC<LogsModalProps> = ({
  logs,
  isOpen,
  onClose,
  getDeptNameById,
}) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-secondary w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg overflow-hidden animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-twhite">
              {t("Transaction Logs")}
            </h2>
            <span className="px-3 py-1 text-xs rounded-full bg-main text-tmid">
              {logs.length} {t("entries")}
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

        {/* Logs Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-8rem)]">
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-dark rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-tmid"
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
              </div>
              <p className="text-tmid">{t("No logs available")}</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700/50" />

              {/* Logs */}
              <div className="space-y-6">
                {logs.map((log, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-main border-4 border-secondary flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-tmid"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>

                    {/* Log content */}
                    <div className="bg-dark rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-twhite">
                          {getDeptNameById(log.department_id)}
                        </span>
                        <span className="text-xs text-tmid">
                          {formatDate(log.finished_at)}
                        </span>
                      </div>
                      <p className="text-sm text-tmid whitespace-pre-wrap">
                        {log.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogsModal;
