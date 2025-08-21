"use server";

import { revalidateTag } from "next/cache";

export const updateUser = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Record<string, unknown>;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to update user: ${res.statusText}`);
  }

  const data = await res.json();

  // ✅ Revalidate "users" cache after success
  revalidateTag("users");

  return data;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.statusText}`);
  }

  const data = await res.json();
  revalidateTag("users");
  return data;
};

export const updateProperty = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Record<string, unknown>;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to update user: ${res.statusText}`);
  }

  const data = await res.json();

  // ✅ Revalidate "users" cache after success
  revalidateTag("property");

  return data;
};
export const deleteProperties = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.statusText}`);
  }

  const data = await res.json();
  revalidateTag("users");
  return data;
};
