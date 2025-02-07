// src/components/Login/Login.tsx
"use client";
import Background from "@/components/common/atoms/Background";
import ChangingPasswordModal from "@/components/common/atoms/ChangingPasswordModal";
import LoginForm from "@/components/common/atoms/LoginForm";
import LoginHeader from "@/components/common/atoms/LoginHeader";
import { useMokkBar } from "@/components/Providers/Mokkbar";
import useCustomTheme from "@/hooks/useCustomTheme";
import { useRedux } from "@/hooks/useRedux";
import { AppDispatch } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const { selector } = useRedux((state) => state.user);
  const { loading, error, isAuthenticated } = selector;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const { isLightMode } = useCustomTheme();
  const { setSnackbarConfig } = useMokkBar();

  useEffect(() => {
    if (isAuthenticated) router.replace("/home");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error?.includes("You must change your password on the first login")) {
      const [, extractedEmpId] = error.split(",");
      setEmpId(extractedEmpId);
      setIsModalOpen(true);
    }
  }, [error]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 fixed inset-0 
      ${
        isLightMode
          ? "bg-gradient-to-br from-blue-50 via-white to-blue-50"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      }`}
    >
      <Background />
      <div
        className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg 
        ${
          isLightMode
            ? "bg-white/80 shadow-gray-200/50"
            : "bg-gray-900/80 shadow-black/30"
        }`}
      >
        <LoginHeader />
        <LoginForm
          dispatch={dispatch}
          setSnackbarConfig={setSnackbarConfig}
          setIsModalOpen={setIsModalOpen}
          setEmpId={setEmpId}
          loading={loading}
        />{" "}
      </div>
      <ChangingPasswordModal
        empId={empId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Login;
