"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Home } from "lucide-react";

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface PropertyData {
  _id: string;
  title: string;
  ownerId: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    phoneNumber: string;
  };
  location: string;
  type: string;
  rent: string;
  rooms: string;
  bathrooms: string;
  area: string;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock data (replace with API calls in production)
const users: UserData[] = [
  {
    _id: "689ebf8e0b6295dc6d980457",
    fullName: "Aali",
    email: "talent@gmail.com",
    role: "owner",
    phoneNumber: "+8801967119057",
    createdAt: "2025-08-15T05:03:10.171Z",
    updatedAt: "2025-08-15T05:03:10.171Z",
  },
];

const properties: PropertyData[] = [
  {
    _id: "68a224fd75df5ee4e198bc43",
    title: "This",
    ownerId: {
      _id: "689ebf8e0b6295dc6d980457",
      fullName: "Aali",
      email: "talent@gmail.com",
      role: "owner",
      phoneNumber: "+8801967119057",
    },
    location: "Sonadanga",
    type: "Bachelor",
    rent: "34",
    rooms: "3",
    bathrooms: "3",
    area: "12321",
    description: "Thi si th eproperty",
    features: ["Gym Access", "Semi-Furnished"],
    images: [
      "https://res.cloudinary.com/dzrlmvvzu/image/upload/v1755456380/t7yjhzzxfbzmskpaalsa.png",
    ],
    createdAt: "2025-08-17T18:52:45.562Z",
    updatedAt: "2025-08-17T18:52:45.562Z",
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "properties">("users");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full p-4 text-left ${
              activeTab === "users"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center w-full p-4 text-left ${
              activeTab === "properties"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            Properties
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {activeTab === "users" ? "User Management" : "Property Management"}
        </h2>

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Properties Table */}
        {activeTab === "properties" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${property.rent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.ownerId.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
