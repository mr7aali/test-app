"use server";
import { revalidateTag } from "next/cache";

export const updateProfile = async ({
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

  revalidateTag("profile");

  return data;
};
