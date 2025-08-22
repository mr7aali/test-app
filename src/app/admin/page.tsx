import AdminDashboard from "./AdminDashboard";

const fetchUsers = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users`, {
    next: { tags: ["users"], revalidate: 0 },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const fetchProperties = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property`, {
    next: { tags: ["property"], revalidate: 0 },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

const fetchNeedApproveProperties = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/property/not-approved`,
    { next: { tags: ["property"], revalidate: 0 }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch properties needing approval");
  return res.json();
};

const AdminPage = async () => {
  const [users, properties, needApproveProperties] = await Promise.all([
    fetchUsers(),
    fetchProperties(),
    fetchNeedApproveProperties(),
  ]);

  return (
    <AdminDashboard
      users={users}
      properties={properties}
      needApproveProperties={needApproveProperties}
    />
  );
};

export default AdminPage;
