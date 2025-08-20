"use client";
import React, { useState } from "react";
import { User, Home, CheckCircle } from "lucide-react";

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
  isApproved: boolean;
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
    isApproved: false,
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "users" | "properties" | "approvals"
  >("users");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(
    null
  );
  const [confirmAction, setConfirmAction] = useState<
    | "deleteUser"
    | "deleteProperty"
    | "approveProperty"
    | "rejectProperty"
    | null
  >(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
  });
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    location: "",
    type: "",
    rent: "",
    rooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setUserForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
    setShowUserModal(true);
  };

  const handleEditProperty = (property: PropertyData) => {
    setSelectedProperty(property);
    setPropertyForm({
      title: property.title,
      location: property.location,
      type: property.type,
      rent: property.rent,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      area: property.area,
      description: property.description,
    });
    setShowPropertyModal(true);
  };

  const handleUpdateUser = () => {
    // Implement update user logic (e.g., API call)
    console.log("Updating user:", userForm);
    setShowUserModal(false);
  };

  const handleUpdateProperty = () => {
    // Implement update property logic (e.g., API call)
    console.log("Updating property:", propertyForm);
    setShowPropertyModal(false);
  };

  const handleConfirm = () => {
    if (confirmAction === "deleteUser") {
      console.log(`Deleting user ${confirmId}`);
    } else if (confirmAction === "deleteProperty") {
      console.log(`Deleting property ${confirmId}`);
    } else if (confirmAction === "approveProperty") {
      console.log(`Approving property ${confirmId}`);
    } else if (confirmAction === "rejectProperty") {
      console.log(`Rejecting property ${confirmId}`);
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmId(null);
  };

  const openConfirmModal = (
    action:
      | "deleteUser"
      | "deleteProperty"
      | "approveProperty"
      | "rejectProperty",
    id: string
  ) => {
    setConfirmAction(action);
    setConfirmId(id);
    setShowConfirmModal(true);
  };

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
            } transition-colors duration-200`}
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
            } transition-colors duration-200`}
          >
            <Home className="w-5 h-5 mr-2" />
            Properties
          </button>
          <button
            onClick={() => setActiveTab("approvals")}
            className={`flex items-center w-full p-4 text-left ${
              activeTab === "approvals"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            } transition-colors duration-200`}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Approvals
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {activeTab === "users"
            ? "User Management"
            : activeTab === "properties"
            ? "Property Management"
            : "Property Approvals"}
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
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 mr-2 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openConfirmModal("deleteUser", user._id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
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
                      <button
                        onClick={() => handleEditProperty(property)}
                        className="text-blue-600 hover:text-blue-800 mr-2 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          openConfirmModal("deleteProperty", property._id)
                        }
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Approvals Table */}
        {activeTab === "approvals" && (
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
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                      {property.ownerId.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.isApproved ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!property.isApproved && (
                        <>
                          <button
                            onClick={() =>
                              openConfirmModal("approveProperty", property._id)
                            }
                            className="text-green-600 hover:text-green-800 mr-2 transition-colors duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              openConfirmModal("rejectProperty", property._id)
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User Update Modal */}
        {showUserModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Update User
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userForm.fullName}
                    onChange={(e) =>
                      setUserForm({ ...userForm, fullName: e.target.value })
                    }
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role: e.target.value })
                    }
                    placeholder="Role"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={userForm.phoneNumber}
                    onChange={(e) =>
                      setUserForm({ ...userForm, phoneNumber: e.target.value })
                    }
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Update Modal */}
        {showPropertyModal && (
          <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Update Property
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={propertyForm.title}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={propertyForm.location}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        location: e.target.value,
                      })
                    }
                    placeholder="Location"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    value={propertyForm.type}
                    onChange={(e) =>
                      setPropertyForm({ ...propertyForm, type: e.target.value })
                    }
                    placeholder="Type"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rent
                  </label>
                  <input
                    type="text"
                    value={propertyForm.rent}
                    onChange={(e) =>
                      setPropertyForm({ ...propertyForm, rent: e.target.value })
                    }
                    placeholder="Rent"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rooms
                  </label>
                  <input
                    type="text"
                    value={propertyForm.rooms}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        rooms: e.target.value,
                      })
                    }
                    placeholder="Rooms"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="text"
                    value={propertyForm.bathrooms}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        bathrooms: e.target.value,
                      })
                    }
                    placeholder="Bathrooms"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area
                  </label>
                  <input
                    type="text"
                    value={propertyForm.area}
                    onChange={(e) =>
                      setPropertyForm({ ...propertyForm, area: e.target.value })
                    }
                    placeholder="Area"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={propertyForm.description}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none h-24"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProperty}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Confirm Action
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to{" "}
                {confirmAction === "deleteUser"
                  ? "delete this user?"
                  : confirmAction === "deleteProperty"
                  ? "delete this property?"
                  : confirmAction === "approveProperty"
                  ? "approve this property?"
                  : "reject this property?"}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
