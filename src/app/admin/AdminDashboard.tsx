/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/adminPage/AdminSidebar";
import {
  deleteProperties,
  deleteUser,
  updateProperty,
  updateUser,
} from "./actions";
import Loading from "../loading";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/";

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface IProperty {
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
  status: "approve" | "reject" | "pending";
}

export const buttonStyles = {
  primary:
    "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base",
  secondary:
    "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-gray-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base",
  edit: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  delete: "bg-red-600 hover:bg-red-800 focus:ring-red-500",
  approve: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  reject: "bg-red-600 hover:bg-red-800 focus:ring-red-500",
  cancel: "bg-gray-200 hover:bg-gray-300 focus:ring-gray-400",
};
const AdminDashboard = ({
  users,
  properties,
  needApproveProperties,
}: {
  users: IUser[];
  properties: IProperty[];
  needApproveProperties: IProperty[];
}) => {
  const [activeTab, setActiveTab] = useState<
    "users" | "properties" | "approvals"
  >("users");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
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
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    setAuthChecked(false);
    const user = getUserInfo() as {
      email: string;
      sub: string;
      role: "owner" | "admin";
      iat: number;
      exp: number;
    };

    if (!user) {
      router.push("/login");
    }
    if (user?.role !== "admin") {
      router.push("/");
    }
    setAuthChecked(true);
  }, [router]);
  if (!authChecked) {
    return <Loading />;
  }
  const handleEditUser = async (user: IUser) => {
    setSelectedUser(user);
    setUserForm({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    setShowUserModal(true);

    if (selectedUser?._id && selectedUser._id !== undefined) {
      await updateUser({ id: selectedUser?._id, updatedData: userForm });
    }
  };

  const handleEditProperty = (property: IProperty) => {
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

  const handleUpdateUser = async () => {
    if (selectedUser?._id)
      await updateUser({ id: selectedUser._id, updatedData: userForm });

    setShowUserModal(false);
  };

  const handleUpdateProperty = async () => {
    if (selectedProperty?._id)
      await updateProperty({
        id: selectedProperty._id,
        updatedData: propertyForm,
      });

    setShowPropertyModal(false);
  };

  const handleConfirm = async () => {
    if (confirmAction === "deleteUser" && !!confirmId) {
      await deleteUser(confirmId);
    } else if (confirmAction === "deleteProperty" && !!confirmId) {
      await deleteProperties(confirmId);
    } else if (confirmAction === "approveProperty" && !!confirmId) {
      await updateProperty({
        id: confirmId,
        updatedData: {
          status: "approve",
        },
      });
    } else if (confirmAction === "rejectProperty" && !!confirmId) {
      await updateProperty({
        id: confirmId,
        updatedData: {
          status: "reject",
        },
      });
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      <AdminSidebar
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        setActiveTab={setActiveTab}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleSidebar={toggleSidebar}
        key={"3"}
      />
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            {activeTab === "users"
              ? "User Management"
              : activeTab === "properties"
              ? "Property Management"
              : "Property Approvals"}
          </h2>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500 sm:hidden">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {user.role}
                        </div>
                        <div className="text-sm text-gray-500 lg:hidden">
                          {user.phoneNumber}
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden md:table-cell">
                        {user.role}
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden lg:table-cell">
                        {user.phoneNumber}
                      </td>
                      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                        <button
                          onClick={() => handleEditUser(user)}
                          className={`${buttonStyles.primary} ${buttonStyles.edit} mr-2`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            openConfirmModal("deleteUser", user._id)
                          }
                          className={`${buttonStyles.primary} ${buttonStyles.delete}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Properties Table */}
        {activeTab === "properties" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
                      Picture
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                      Rent/m
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties?.map((property) => (
                    <tr key={property._id}>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500 sm:hidden">
                          <img
                            src={property.images[0] || "/placeholder.jpg"}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg mt-1"
                          />
                        </div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {property.location}
                        </div>
                        <div className="text-sm text-gray-500 lg:hidden">
                          ${property.rent}
                        </div>
                        <div className="text-sm text-gray-500 xl:hidden">
                          {property.ownerId.fullName}
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden sm:table-cell">
                        <img
                          src={property.images[0] || "/placeholder.jpg"}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden md:table-cell">
                        {property.location}
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden lg:table-cell">
                        {property.rent} <span className="text-[20px]"> ৳ </span>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                            property.status === "approve"
                              ? "bg-green-600"
                              : property.status === "reject"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                          }`}
                        >
                          {property.status.charAt(0).toUpperCase() +
                            property.status.slice(1)}
                        </span>
                      </td>
                      {/* <td className="px-4 py-4 sm:px-6 hidden xl:table-cell">
                        {property.ownerId.fullName}
                      </td> */}
                      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                        <button
                          onClick={() => handleEditProperty(property)}
                          className={`${buttonStyles.primary} ${buttonStyles.edit} mr-2`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            openConfirmModal("deleteProperty", property._id)
                          }
                          className={`${buttonStyles.primary} ${buttonStyles.delete}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Approvals Table */}
        {activeTab === "approvals" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
                      Picture
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden md:table-cell">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden lg:table-cell">
                      Rent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 hidden xl:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {needApproveProperties?.map((property) => (
                    <tr key={property._id}>
                      {/* {{title}} */}
                      <td className="px-4 py-4 sm:px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>

                        <div className="text-sm text-gray-500 md:hidden">
                          {property.location}
                        </div>
                        <div className="text-sm text-gray-500 lg:hidden">
                          {property.ownerId.fullName}
                        </div>
                        <div className="text-sm text-gray-500 xl:hidden">
                          {property.isApproved ? (
                            <span className="text-green-600">Approved</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </div>
                      </td>
                      {/* picture */}
                      <td className="px-4 py-4 sm:px-6 hidden sm:table-cell">
                        <img
                          src={property.images[0] || "/placeholder.jpg"}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      {/* location */}
                      <td className="px-4 py-4 sm:px-6 hidden md:table-cell">
                        {property.location}
                      </td>
                      <td className="px-4 py-4 sm:px-6 hidden md:table-cell">
                        {" "}
                        {property.rent} <span className="text-[20px]"> ৳ </span>
                      </td>
                      {/* {{status}} */}
                      <td className="px-4 py-4 sm:px-6 hidden md:table-cell">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                            property.status === "approve"
                              ? "bg-green-600"
                              : property.status === "reject"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                          }`}
                        >
                          {property.status.charAt(0).toUpperCase() +
                            property.status.slice(1)}
                        </span>
                      </td>
                      {/* {{button}} */}
                      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                        {!property.isApproved && (
                          <>
                            <button
                              onClick={() =>
                                openConfirmModal(
                                  "approveProperty",
                                  property._id
                                )
                              }
                              className={`${buttonStyles.primary} ${buttonStyles.approve} mr-2`}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                openConfirmModal("rejectProperty", property._id)
                              }
                              className={`${buttonStyles.primary} ${buttonStyles.reject}`}
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
          </div>
        )}

        {/* User Update Modal */}
        {showUserModal && (
          <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Update User
              </h3>
              <div className="space-y-4 sm:space-y-5">
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
                {/* <div>
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  />
                </div> */}
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-end space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className={`${buttonStyles.secondary} ${buttonStyles.cancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className={`${buttonStyles.primary} ${buttonStyles.edit}`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Update Modal */}
        {showPropertyModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Update Property
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>
                <div className="sm:col-span-2">
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
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none h-24 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-end space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className={`${buttonStyles.secondary} ${buttonStyles.cancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProperty}
                  className={`${buttonStyles.primary} ${buttonStyles.edit}`}
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
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Confirm Action
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Are you sure you want to{" "}
                {confirmAction === "deleteUser"
                  ? "delete this user?"
                  : confirmAction === "deleteProperty"
                  ? "delete this property?"
                  : confirmAction === "approveProperty"
                  ? "approve this property?"
                  : "reject this property?"}
              </p>
              <div className="flex justify-end space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className={`${buttonStyles.secondary} ${buttonStyles.cancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className={`${buttonStyles.primary} ${buttonStyles.delete}`}
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
