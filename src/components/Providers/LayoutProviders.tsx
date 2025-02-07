// LayoutProviders.tsx
import { ReactNode } from "react";
import Content from "./Content";
import I18nProvider from "./I18nProvider";
import { QueryProvider } from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import { TaskTimerProvider } from "./TaskTimerContext";
import LoadingProvider from "./LoadingProvider";
import { MokkBarProvider } from "./Mokkbar";

const LayoutProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <I18nProvider>
          <TaskTimerProvider>
            <LoadingProvider>
              <MokkBarProvider>
                <Content>{children}</Content>
              </MokkBarProvider>
            </LoadingProvider>
          </TaskTimerProvider>
        </I18nProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default LayoutProviders;
