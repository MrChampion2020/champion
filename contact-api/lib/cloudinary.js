import { getCloudinaryConfig } from "./config";

function createCloudinaryBasicAuthHeader(apiKey, apiSecret) {
  return `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;
}

export async function uploadImageToCloudinary(file) {
  const config = getCloudinaryConfig();
  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
  const formData = new FormData();

  formData.set("file", file);
  formData.set("folder", config.uploadFolder);
  formData.set("use_filename", "true");
  formData.set("unique_filename", "true");
  formData.set("overwrite", "false");

  const response = await fetch(uploadEndpoint, {
    method: "POST",
    headers: {
      Authorization: createCloudinaryBasicAuthHeader(
        config.apiKey,
        config.apiSecret
      ),
    },
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      "Cloudinary upload failed.";

    throw new Error(message);
  }

  return {
    imageUrl: payload?.secure_url || "",
    publicId: payload?.public_id || "",
    width: payload?.width || null,
    height: payload?.height || null,
    format: payload?.format || "",
  };
}
