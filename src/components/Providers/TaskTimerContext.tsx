import React, { createContext, useContext, useState } from "react";

type TimerContextType = {
  timers: { [taskId: string]: number };
  isRunning: { [taskId: string]: boolean };
  startTimer: (taskId: string) => void;
  pauseTimer: (taskId: string) => void;
  setElapsedTime: (taskId: string, elapsedTime: number) => void;
};

const TaskTimerContext = createContext<TimerContextType | undefined>(undefined);

export const TaskTimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timers, setTimers] = useState<{ [taskId: string]: number }>({});
  const [isRunning, setIsRunning] = useState<{ [taskId: string]: boolean }>({});

  const startTimer = (taskId: string) => {
    setIsRunning((prev) => ({ ...prev, [taskId]: true }));
  };

  const pauseTimer = (taskId: string) => {
    setIsRunning((prev) => ({ ...prev, [taskId]: false }));
  };

  const setElapsedTime = (taskId: string, elapsedTime: number) => {
    setTimers((prev) => ({ ...prev, [taskId]: elapsedTime }));
  };

  return (
    <TaskTimerContext.Provider
      value={{ timers, isRunning, startTimer, pauseTimer, setElapsedTime }}
    >
      {children}
    </TaskTimerContext.Provider>
  );
};

export const useTaskTimer = () => {
  const context = useContext(TaskTimerContext);
  if (!context) {
    throw new Error("useTaskTimer must be used within a TaskTimerProvider");
  }
  return context;
};
