import React from "react";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
  return (
    <div>
      <div>
        <div>MM</div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
