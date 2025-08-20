"use server";

export async function getUserProfile({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) {
  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const profileData = await res.json();

    if (profileData.success) {
      return profileData?.data;
    } else {
      const refreshtokenRes = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const accesTokenResponse = await refreshtokenRes.json();

      if (!!accesTokenResponse.accessToken) {
        return getUserProfile({ accessToken: accesTokenResponse.accessToken });
      } else {
      }
    }
  } catch (err) {
    console.error("Network error:", err);
  }
}

export const getHomePageProperties = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property`);
  const data = await res.json();

  return data;
};
