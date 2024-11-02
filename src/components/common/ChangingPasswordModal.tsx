import { changePasswordSchema } from "@/schemas/login.schema";
import { ChangePasswordFormInputs } from "@/types/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const ChangingPasswordModal = ({
  isModalOpen,
  setIsModalOpen,
  empId,
}: {
  empId: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register: registerChangePassword,
    handleSubmit: handleChangePasswordSubmit,
    formState: { errors: changePasswordErrors },
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(changePasswordSchema),
  });

  const handlePasswordChange = async (data: ChangePasswordFormInputs) => {
    try {
      const response = await axios.post(
        `http://${process.env.BASE_URL}/auth/change-password/${empId}`,
        { newPassword: data.newPassword }
      );
      console.log(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      ariaHideApp={false}
      contentLabel="Change Password"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePasswordSubmit(handlePasswordChange)}>
          <div>
            <label className="block  text-sm font-medium">New Password</label>
            <input
              type="password"
              {...registerChangePassword("newPassword")}
              className={`w-full px-4 py-2 mt-1 rounded-lg    focus:outline-none focus:ring-2 focus:ring-accent border ${
                changePasswordErrors.newPassword
                  ? "border-red-600"
                  : "border-[#1b1a40]"
              }`}
              placeholder="Enter new password"
            />
            {changePasswordErrors.newPassword && (
              <p className="text-red-600 mt-1 text-sm">
                {changePasswordErrors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="block  text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...registerChangePassword("confirmPassword")}
              className={`w-full px-4 py-2 mt-1 rounded-lg    focus:outline-none focus:ring-2 focus:ring-accent border ${
                changePasswordErrors.confirmPassword
                  ? "border-red-600"
                  : "border-[#1b1a40]"
              }`}
              placeholder="Confirm new password"
            />
            {changePasswordErrors.confirmPassword && (
              <p className="text-red-600 mt-1 text-sm">
                {changePasswordErrors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200"
          >
            Change Password
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
        >
          &times;
        </button>
      </div>
    </Modal>
  );
};

export default ChangingPasswordModal;
