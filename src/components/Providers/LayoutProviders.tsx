import { ReactNode } from "react";
import Content from "./Content";
import I18nProvider from "./I18nProvider";
import { QueryProvider } from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
const LayoutProviders = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <I18nProvider>
          <Content>{children}</Content>
        </I18nProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default LayoutProviders;
