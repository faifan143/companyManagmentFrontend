import React, { ReactElement } from "react";

const GridContainer = ({
  children,
  extraStyle,
}: {
  children: ReactElement | ReactElement[];
  extraStyle?: string;
}) => {
  return (
    <div className={"sm:w-full mobile-grid sm:desktop-grid  " + extraStyle}>
      {children}
    </div>
  );
};

export default GridContainer;
