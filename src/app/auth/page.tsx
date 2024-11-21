/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ChangingPasswordModal from "@/components/common/atoms/ChangingPasswordModal";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import { loginSchema } from "@/schemas/login.schema";
import { handleLogin } from "@/services/auth.service";
import { AppDispatch } from "@/state/store";
import { LoginFormInputs } from "@/types/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRedux } from "@/hooks/useRedux";
import useSnackbar from "@/hooks/useSnackbar";
import useCustomTheme from "@/hooks/useCustomTheme";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { selector } = useRedux((state) => state.user);
  const { loading, error, isAuthenticated } = selector;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const { isLightMode } = useCustomTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: LoginFormInputs) => {
    await handleLogin({
      data,
      dispatch,
      setSnackbarConfig,
      setIsModalOpen,
      setEmpId,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (errors.email || errors.password) {
      console.log(errors);
      setSnackbarConfig({
        open: true,
        message: errors.email
          ? errors.email.message + ""
          : errors.password
          ? errors.password.message + ""
          : "error occured while validating",
        severity: "error",
      });
    }
  }, [errors, setSnackbarConfig]);

  useEffect(() => {
    if (
      error &&
      error
        .split(",")[0]
        .includes("You must change your password on the first login")
    ) {
      setEmpId(error.split(",")[1]);
      setIsModalOpen(true);
    }
  }, []);
  return (
    <div
      className={`flex items-center justify-center min-h-screen
    
    ${isLightMode ? "bg-main" : "bg-radial-light"}
     fixed inset-0`}
    >
      <div
        className={`backdrop-blur-md ${
          isLightMode ? "bg-secondary" : "bg-dark"
        }  text-twhite p-10 rounded-xl shadow-xl max-w-sm w-full`}
      >
        <h1 className="text-center text-2xl text-twhite font-bold mb-6">
          {t("CompanyManagmentSystem")}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">{t("Email")}</label>
            <input
              type="email"
              {...register("email")}
              className={` ${
                isLightMode ? "bg-dark" : "bg-secondary"
              } outline-none border-none  w-full px-4 py-2 mt-1 rounded-lg focus:outline-none  border ${
                errors.email ? "border-red-600" : "border-[#1b1a40]"
              }`}
              placeholder={t("Enter your email")}
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">{t("Password")}</label>
            <input
              type="password"
              {...register("password")}
              className={` ${
                isLightMode ? "bg-dark" : "bg-secondary"
              } outline-none border-none  w-full px-4 py-2 mt-1 rounded-lg focus:outline-none  border ${
                errors.password ? "border-red-600" : "border-[#1b1a40]"
              }`}
              placeholder={t("Enter your password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-slate-600 
                        ${isLightMode ? " text-tblackAF" : "text-twhite"}

            rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? t("Logging in...") : t("Login")}
          </button>
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </form>
      </div>
      <ChangingPasswordModal
        empId={empId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default Login;
