import useSnackbar from "@/hooks/useSnackbar";
import { changePasswordSchema } from "@/schemas/login.schema";
import { ChangePasswordFormInputs } from "@/types/Login.type";
import { apiClient } from "@/utils/axios";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import CustomizedSnackbars from "./CustomizedSnackbars";

const ChangingPasswordModal = ({
  isModalOpen,
  setIsModalOpen,
  empId,
}: {
  empId: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const {
    register: registerChangePassword,
    handleSubmit: handleChangePasswordSubmit,
    formState: { errors: changePasswordErrors },
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(changePasswordSchema),
  });

  const handlePasswordChange = async (data: ChangePasswordFormInputs) => {
    try {
      const response = await apiClient.post(`/auth/change-password/${empId}`, {
        newPassword: data.newPassword,
      });
      console.log(response);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  useEffect(() => {
    if (Object.keys(changePasswordErrors).length > 0) {
      getErrorMessages({ errors: changePasswordErrors, setSnackbarConfig });
    }
  }, [changePasswordErrors, setSnackbarConfig]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      ariaHideApp={false}
      contentLabel={t("Change Password")}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-droppable-fade text-twhite p-8 rounded-xl shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4">{t("Change Password")}</h2>
        <form onSubmit={handleChangePasswordSubmit(handlePasswordChange)}>
          <div>
            <label className="block  text-sm font-medium">
              {t("New Password")}
            </label>
            <input
              type="password"
              {...registerChangePassword("newPassword")}
              className={`w-full px-4 py-2 mt-1 rounded-lg  bg-secondary    focus:outline-none  border ${
                changePasswordErrors.newPassword
                  ? "border-red-600"
                  : "border-[#1b1a40]"
              }`}
              placeholder={t("Enter new password")}
            />
            {changePasswordErrors.newPassword && (
              <p className="text-red-600 mt-1 text-sm">
                {changePasswordErrors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="block  text-sm font-medium">
              {t("Confirm Password")}
            </label>
            <input
              type="password"
              {...registerChangePassword("confirmPassword")}
              className={`w-full px-4 py-2 mt-1 rounded-lg    bg-secondary  focus:outline-none  border ${
                changePasswordErrors.confirmPassword
                  ? "border-red-600"
                  : "border-[#1b1a40]"
              }`}
              placeholder={t("Confirm new password")}
            />
            {changePasswordErrors.confirmPassword && (
              <p className="text-red-600 mt-1 text-sm">
                {changePasswordErrors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-dark text-twhite rounded-lg font-bold hover:bg-opacity-90 transition duration-200"
          >
            {t("Change Password")}
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-tblack hover:text-red-500"
        >
          &times;
        </button>
        <CustomizedSnackbars
          open={snackbarConfig.open}
          message={snackbarConfig.message}
          severity={snackbarConfig.severity}
          onClose={() =>
            setSnackbarConfig((prev) => ({ ...prev, open: false }))
          }
        />
      </div>
    </Modal>
  );
};

export default ChangingPasswordModal;
