import PropertyDetail from "./PropertyDetail";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch property data");
  }
  const property = await res.json();

  return <PropertyDetail property={property} />;
}
