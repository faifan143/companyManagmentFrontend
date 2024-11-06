import {
  HandleDeleteStatusClick,
  HandleEditStatusClickProps,
  HandleEditTypeClickProps,
} from "@/types/Task.type";
import axios from "axios";
import Cookies from "js-cookie";

export const handleEditTypeClick = ({
  taskType,
  setEditData,
  setIsModalOpen,
}: HandleEditTypeClickProps) => {
  setEditData(taskType);
  setIsModalOpen(true);
};

export const handleEditStatusClick = ({
  setEditData,
  setIsModalOpen,
  taskStatus,
}: HandleEditStatusClickProps) => {
  setEditData(taskStatus);
  setIsModalOpen(true);
};

export const handleDeleteStatusClick = async ({
  id,
  refetch,
}: HandleDeleteStatusClick) => {
  try {
    await axios.delete(
      `http://${process.env.BASE_URL}/task-status/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      }
    );
    refetch();
  } catch (error) {
    console.error("Error deleting task status:", error);
  }
};
