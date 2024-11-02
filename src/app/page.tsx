/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ChangingPasswordModal from "@/components/common/ChangingPasswordModal";
import { loginSchema } from "@/schemas/login.schema";
import { loginUser } from "@/state/slices/userSlice";
import { LoginFormInputs } from "@/types/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRedux } from "../hooks/useRedux";
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";

const Login: React.FC = () => {
  const { dispatchAction, selector } = useRedux((state) => state.user);
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

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await dispatchAction(loginUser, data).unwrap();
      console.log("Login successful", result);

      setSnackbarConfig({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } catch (err: any) {
      setEmpId(err.split(",")[1]);
      if (err.startsWith("You must change your password on the first login")) {
        setIsModalOpen(true);
      } else {
        console.error("Login failed", err);
        setSnackbarConfig({
          open: true,
          message: "Login failed. Please check your credentials.",
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="backdrop-blur-md bg-gray-200 p-10 rounded-xl shadow-xl max-w-sm w-full">
        <h1 className="text-center text-2xl text-[#1b1a40] font-bold mb-6">
          Company Managment System
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.email ? "border-red-600" : "border-[#1b1a40]"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.password ? "border-red-600" : "border-[#1b1a40]"
              }`}
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
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
