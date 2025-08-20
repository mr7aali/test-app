// import { buttonStyles } from "@/app/admin/page";
import { buttonStyles } from "@/app/admin/AdminDashboard";
import React from "react";
interface IUserData {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}
const UserTable = ({
  activeTab,
  users,
  handleEditUser,
  openConfirmModal,
}: {
  activeTab: "users" | "properties" | "approvals";
  users: IUserData[];
  handleEditUser: (user: IUserData) => void;
  openConfirmModal: (action: string, userId: string) => void;
}) => {
  return (
    <>
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
                {users.map((user) => (
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
                        onClick={() => openConfirmModal("deleteUser", user._id)}
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
    </>
  );
};

export default UserTable;
