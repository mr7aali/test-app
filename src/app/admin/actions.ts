"use server";

import { revalidateTag } from "next/cache";

export const updateUser = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/${id}`, {
    method: "PUT", // ✅ use PUT for update
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData), // ✅ send updated data
    cache: "no-store", // ensure fresh data
  });

  if (!res.ok) {
    throw new Error(`Failed to update user: ${res.statusText}`);
  }

  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.statusText}`);
  }

  return res.json();
};
