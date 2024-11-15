import axios from "axios";
import Cookies from "js-cookie";

const useTimeTicker = ({ taskId }: { taskId: string }) => {
  const startTaskTicker = async () => {
    try {
      await axios
        .get(`http://${process.env.BASE_URL}/tasks/start/${taskId}`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        })
        .then(() => {
          console.log("Task started")
        
        
        });
    } catch (error) {
      console.log("Failed to start , error: " + error);
    }
  };

  const pauseTaskTicker = async () => {
    try {
      await axios
        .get(`http://${process.env.BASE_URL}/tasks/pause/${taskId}`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        })
        .then(() => console.log("Task paused"));
    } catch (error) {
      console.log("Failed to pause , error: " + error);
    }
  };
  const completedTaskTicker = async () => {
    try {
      await axios
        .get(`http://${process.env.BASE_URL}/tasks/complete/${taskId}`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        })
        .then(() => console.log("Task completed"));
    } catch (error) {
      console.log("Failed to complete , error: " + error);
    }
  };

  return { startTaskTicker, pauseTaskTicker, completedTaskTicker };
};

export default useTimeTicker;
