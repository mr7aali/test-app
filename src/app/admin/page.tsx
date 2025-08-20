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
  const needAppRes = await fetch(
    `${process.env.BACKEND_URL}/api/v1/not-approved`,
    {
      next: {
        tags: ["property"],
      },
    }
  );
  const users = await userRes.json();
  const properties = await property.json();
  const needApproveProperties = await needAppRes.json();

  return (
    <div>
      <AdminDashboard
        users={users}
        properties={properties}
        needApproveProperties={needApproveProperties}
      />
    </div>
  );
};

export default AdminPage;
