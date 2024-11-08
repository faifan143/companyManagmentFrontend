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
import { useRedux } from "../hooks/useRedux";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { selector } = useRedux((state) => state.user);
  const { loading, error, isAuthenticated } = selector;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

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
  }, [errors]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="backdrop-blur-md bg-gray-200 p-10 rounded-xl shadow-xl max-w-sm w-full">
        <h1 className="text-center text-2xl text-[#1b1a40] font-bold mb-6">
          {t("CompanyManagmentSystem")}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">{t("Email")}</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
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
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
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
            className={`w-full py-2 mt-4 bg-[#1b1a40] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
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
