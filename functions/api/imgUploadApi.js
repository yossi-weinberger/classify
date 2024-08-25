import { handleApiRequest, SERVER_URL } from '../utils/apiUtils';


// Uploads an image
export async function uploadImage(file) {
    if (!file) {
        console.error("No file provided");
        throw new Error("No file provided");
    }

    try {
        const formData = new FormData();
        formData.append("image", file);

        const url = `${SERVER_URL}/cloudinary/upload`;
        console.log("Sending request to:", url);

        const data = await handleApiRequest(url, {
            method: "POST",
            headers: {
                Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
            },
            body: formData,
        });

        console.log("Response data:", data);
        return data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // זה יכלול את הודעת השגיאה המפורטת
    }
}