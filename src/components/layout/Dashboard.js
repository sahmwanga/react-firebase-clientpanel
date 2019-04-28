import React from "react";
import Client from "../clients/Clients";
import SideBar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <Client />
      </div>
      <div className="col-md-2">
        <SideBar />
      </div>
    </div>
  );
}
