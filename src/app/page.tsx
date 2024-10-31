/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRedux } from "../hooks/useRedux";
import { loginUser } from "@/state/slices/userSlice";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 6 characters")
    .required("Password is required"),
});

const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

interface ChangePasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const Login: React.FC = () => {
  const { dispatchAction, selector } = useRedux((state) => state.user);
  const { loading, error, isAuthenticated } = selector;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empId, setEmpId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const {
    register: registerChangePassword,
    handleSubmit: handleChangePasswordSubmit,
    formState: { errors: changePasswordErrors },
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await dispatchAction(loginUser, data).unwrap();
      console.log("Login successful", result);
    } catch (err: any) {
      setEmpId(err.split(",")[1]);
      if (err.startsWith("You must change your password on the first login")) {
        setIsModalOpen(true);
      } else {
        console.error("Login failed", err);
      }
    }
  };

  const handlePasswordChange = async (data: ChangePasswordFormInputs) => {
    try {
      const response = await axios.post(
        `http://${process.env.BASE_URL}/auth/change-password/${empId}`,
        { newPassword: data.newPassword }
      );
      console.log(response.data);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error changing password", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Login Form */}
      <div className="backdrop-blur-md bg-gray-200 p-10 rounded-xl shadow-xl max-w-sm w-full">
        <h1 className="text-center text-2xl text-[#1b1a40] font-bold mb-6">
          Company Managment System
        </h1>
        {/* <h2 className="text-center text-xl text-[#1b1a40] font-bold mb-6">
          Login
        </h2> */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
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
          {/* Password Input */}
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
          {/* Submit Button */}
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

      {/* Modal for changing password */}
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
    </div>
  );
};

export default Login;
