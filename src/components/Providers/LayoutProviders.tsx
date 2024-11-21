import { ReactNode } from "react";
import Content from "./Content";
import I18nProvider from "./I18nProvider";
import { QueryProvider } from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import { TaskTimerProvider } from "./TaskTimerContext";
const LayoutProviders = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <I18nProvider>
          <TaskTimerProvider>
            <Content>{children}</Content>
          </TaskTimerProvider>
        </I18nProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default LayoutProviders;
