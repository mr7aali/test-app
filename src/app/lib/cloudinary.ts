export const CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUDINARY_CONFIG_cloudName || "dzrlmvvzu",
  uploadPreset: process.env.CLOUDINARY_CONFIG_uploadPreset || "placearea",
  get apiUrl() {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  },
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    throw new Error(
      "Cloudinary configuration is missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  try {
    console.log("[v0] Uploading to Cloudinary:", CLOUDINARY_CONFIG.apiUrl);

    const response = await fetch(CLOUDINARY_CONFIG.apiUrl, {
      method: "POST",
      body: formData,
    });

    console.log("[v0] Cloudinary response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("[v0] Cloudinary error response:", errorText);
      throw new Error(
        `Cloudinary upload failed: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[v0] Cloudinary upload successful:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("[v0] Cloudinary upload error:", error);
    throw error;
  }
};
