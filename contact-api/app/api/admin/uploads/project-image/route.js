import { requireAdminSession } from "../../../../../lib/adminAuth";
import { json, optionsResponse } from "../../../../../lib/http";
import { uploadImageToCloudinary } from "../../../../../lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

export async function OPTIONS(request) {
  return optionsResponse(request, {
    allowHeaders: "Content-Type, Authorization",
  });
}

export async function POST(request) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return json(
      request,
      { error: "Invalid upload payload." },
      { status: 400 }
    );
  }

  const imageFile = formData.get("image");

  if (!(imageFile instanceof File)) {
    return json(
      request,
      { error: "Please choose an image to upload." },
      { status: 400 }
    );
  }

  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    return json(
      request,
      {
        error:
          "Unsupported image format. Upload a JPG, PNG, WEBP, GIF, or AVIF image.",
      },
      { status: 400 }
    );
  }

  if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
    return json(
      request,
      { error: "Image is too large. Keep project images under 8MB." },
      { status: 400 }
    );
  }

  try {
    const uploadResult = await uploadImageToCloudinary(imageFile);

    return json(
      request,
      {
        ok: true,
        imageUrl: uploadResult.imageUrl,
        publicId: uploadResult.publicId,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Project image upload failed", error);
    return json(
      request,
      {
        error:
          error instanceof Error
            ? error.message
            : "Project image upload failed.",
      },
      { status: 500 }
    );
  }
}
