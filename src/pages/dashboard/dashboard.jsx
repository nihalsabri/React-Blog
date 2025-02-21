import React from "react";
import Sidebar from "../../component/sidebar/sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
    
      <Sidebar />

    
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          This is the main content area. You can add charts, tables, or other components here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;