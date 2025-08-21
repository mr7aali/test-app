"use server";
export const getSavePageProperties = async ({ ids }: { ids: string[] }) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property/by-ids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: ids }),
  });
  const data = await res.json();

  return data;
};
