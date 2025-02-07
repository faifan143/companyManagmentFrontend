"use client"
import { loginSchema } from "@/schemas/login.schema";
import { handleLogin } from "@/services/auth.service";
import { AppDispatch } from "@/state/store";
import { SnackbarConfig } from "@/types/DepartmentType.type";
import { LoginFormInputs } from "@/types/Login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, EyeOff, Eye , Lock } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const LoginForm = ({
    dispatch,
    setSnackbarConfig,
    setIsModalOpen, // Add these props
    setEmpId, // Add these props
    loading,
  }: {
    dispatch: AppDispatch;
    setSnackbarConfig: Dispatch<SetStateAction<SnackbarConfig>>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>; // New prop
    setEmpId: Dispatch<SetStateAction<string>>; // New prop
    loading: boolean;
  }) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormInputs>({
      resolver: yupResolver(loginSchema),
    });
  
    const onSubmit = async (data: LoginFormInputs) => {
      await handleLogin({ data, dispatch, setSnackbarConfig, setIsModalOpen, setEmpId });
      setSnackbarConfig({ open: true, message: "Login successful!", severity: "success" });
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            {...register("email")}
            className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none border ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder={t("Email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
  
        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none border ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            placeholder={t("Password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>
  
        {/* Submit Button */}
        <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-blue-600 text-white">
          {loading ? t("Logging in...") : t("Login")}
        </button>
      </form>
    );
  };
  
  export default LoginForm;
  