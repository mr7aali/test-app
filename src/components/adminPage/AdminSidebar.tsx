import { User, Home, CheckCircle, X } from "lucide-react";
import React from "react";
const AdminSidebar = ({
  isSidebarOpen,
  toggleSidebar,
  setActiveTab,
  setIsSidebarOpen,
  activeTab,
}: {
  isSidebarOpen: boolean;
  toggleSidebar(): void;
  activeTab: string;
  setActiveTab: React.Dispatch<
    React.SetStateAction<"users" | "properties" | "approvals">
  >;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 lg:static lg:transform-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <nav className="mt-6">
        <button
          onClick={() => {
            setActiveTab("users");
            setIsSidebarOpen(false);
          }}
          className={`flex items-center w-full p-4 text-left ${
            activeTab === "users"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } transition-colors duration-200 text-sm sm:text-base`}
        >
          <User className="w-5 h-5 mr-2" />
          Users
        </button>
        <button
          onClick={() => {
            setActiveTab("properties");
            setIsSidebarOpen(false);
          }}
          className={`flex items-center w-full p-4 text-left ${
            activeTab === "properties"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } transition-colors duration-200 text-sm sm:text-base`}
        >
          <Home className="w-5 h-5 mr-2" />
          All Properties
        </button>
        <button
          onClick={() => {
            setActiveTab("approvals");
            setIsSidebarOpen(false);
          }}
          className={`flex items-center w-full p-4 text-left ${
            activeTab === "approvals"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } transition-colors duration-200 text-sm sm:text-base`}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Need Approvals
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
