import React from "react";

const MainLayout = async ({ children }) => {
  return <div className="container mx-auto mt-6 mb-20 w-11/12">{children}</div>;
};

export default MainLayout;