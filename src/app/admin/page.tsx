import AdminDashboard from "./AdminDashboard";

const AdminPage = async () => {
  const userRes = await fetch(`${process.env.BACKEND_URL}/api/v1/users`, {
    next: {
      tags: ["users"],
    },
  });
  const property = await fetch(`${process.env.BACKEND_URL}/api/v1/property`, {
    next: {
      tags: ["property"],
    },
  });
  const users = await userRes.json();
  const properties = await property.json();

  return (
    <div>
      <AdminDashboard users={users} properties={properties} />
    </div>
  );
};

export default AdminPage;
