import React from "react";
import Sidebar from "../../component/sidebar/sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
    
      <Sidebar />
    
      <div>
        <h1 >Welcome to the Dashboard</h1>
        <p>
          This is the main content area. You can add charts, tables, or other components here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;