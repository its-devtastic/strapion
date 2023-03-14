import React from "react";
import { Outlet } from "react-router-dom";

import MainMenu from "../ui/MainMenu";
import AppHeader from "../ui/AppHeader";

const Root: React.FC = () => {
  return (
    <div className="h-screen flex">
      <MainMenu />
      <div className="flex-1 flex flex-col">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
