/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUser } from "@/state/slices/userSlice";
import { AppDispatch } from "@/state/store";
import { LoginFormInputs, LoginServiceOptions } from "@/types/Login.type";

export const login = async (data: LoginFormInputs, dispatch: AppDispatch) => {
  try {
    const result = await dispatch(loginUser(data)).unwrap();
    return { success: true, result };
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async ({
  data,
  dispatch,
  setSnackbarConfig,
  setIsModalOpen,
  setEmpId,
}: LoginServiceOptions) => {
  try {
    console.log(1);

    const result = await dispatch(loginUser(data)).unwrap();
    console.log(2);
    console.log("Login successful", result);

    console.log(3);
    setSnackbarConfig({
      open: true,
      message: "Login successful!",
      severity: "success",
    });
    console.log(4);

    return { success: true };
  } catch (error: any) {
    console.log(error);

    console.log(5);
    setEmpId(error.split(",")[1]);
    console.log(6);
    if (error.startsWith("You must change your password on the first login")) {
      console.log(7);
      setEmpId(error.split(",")[1]);
      setIsModalOpen(true); // Ensure this runs after setEmpId
      console.log(8);
    } else {
      console.log(9);
      console.error("Login failed", error);
      console.log(10);
      setSnackbarConfig({
        open: true,
        message: "Login failed. Please check your credentials.",
        severity: "error",
      });
      console.log(11);
    }

    return { success: false };
  }
};
