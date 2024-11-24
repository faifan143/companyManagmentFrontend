import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useLanguage from "@/hooks/useLanguage";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string[];
  language: "en" | "ar"; // Add more languages as needed
  actionText: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  language,
  actionText,
  maxWidth = "sm",
  fullWidth = true,
}) => {
  const textAlignment = language === "en" ? "text-left" : "text-right";
  const { t } = useLanguage();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle className={`text-twhite bg-secondary ${textAlignment}`}>
        {title}
      </DialogTitle>
      <DialogContent className="text-twhite bg-secondary">
        <ul className="text-twhite list-disc ml-4">
          {content.map((item, index) => (
            <li key={index}>{t(item)}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions className="text-twhite bg-secondary">
        <div
          onClick={onClose}
          className="bg-dark py-2 px-4 hover:bg-opacity-70 text-twhite cursor-pointer rounded-md"
        >
          {(actionText)}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
