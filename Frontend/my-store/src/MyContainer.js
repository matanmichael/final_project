import React from "react";
import { Outlet } from "react-router-dom";

const MyContainer = () => {
  return (
    <div>
      <Outlet></Outlet> 
    </div>
  );
};

export default MyContainer;
