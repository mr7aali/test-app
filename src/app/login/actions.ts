"use server";
export const SignUpWithGoogleUser = async ({
  user,
}: {
  user: Record<string, unknown>;
}) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/signup-with-google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    console.log(user);
    if (!res.ok) {
      throw new Error(`Failed to Login user: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("GOOGLE SIGNIN ACTION ERROR: ", error);
  }
};
