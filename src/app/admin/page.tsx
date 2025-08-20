import AdminDashboard from "./AdminDashboard";

const AdminPage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users`, {
    next: {
      tags: ["user"],
    },
  });
  const users = await res.json();

  return (
    <div>
      <AdminDashboard users={users} />
    </div>
  );
};

export default AdminPage;
