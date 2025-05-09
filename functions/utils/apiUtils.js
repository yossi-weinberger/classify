export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL; //|| "https://classify-backend.vercel.app";
// const SERVER_URL = "http://localhost:3001";
// export const SERVER_URL = "https://classify-backend.vercel.app";

export async function handleApiRequest(url, options = {}) {
  console.log("Making API request to:", url);
  console.log("With options:", options);
  console.log("CI:", process.env.CI);
  console.log("WNV:", process.env.env);

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
      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("שגיאת API:", error);
    throw error;
  }
}
