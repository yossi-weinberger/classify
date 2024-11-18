import { handleApiRequest, SERVER_URL } from "../utils/apiUtils";

// Uploads an image
export async function uploadImage(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${SERVER_URL}/cloudinary/upload`, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw new Error(error.message || "שגיאה בהעלאת התמונה");
  }
}
