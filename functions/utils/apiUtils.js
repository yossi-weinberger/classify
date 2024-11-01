export const SERVER_URL = process.env.SERVER_URL;
console.log("SERVER_URL:", SERVER_URL);

export async function handleApiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    console.log("Response status:", response.status);

    if (!response.ok) {
      let errorMessage = `שגיאת שרת: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
      } catch {
        const textContent = await response.text();
        errorMessage += ` - ${textContent}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    // console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("שגיאת API:", error);
    throw error;
  }
}
