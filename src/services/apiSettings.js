import supabase from "./supabase";
const VITE_BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
export async function getSettings() {
  const res = await fetch(`${VITE_BACKEND_ENDPOINT}/settings`);

  if (!res.ok) {
    throw new Error("Settings could not be loaded");
  }
  const data = await res.json();

  return data.result[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const res = await fetch(`${VITE_BACKEND_ENDPOINT}/updateSettings`, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
      // Add other headers if needed, such as Authorization header
    },
    referrerPolicy: "no-referrer", // Referrer policy
    body: JSON.stringify({ ...newSetting, id: 1 }), // Request payload data, converted to JSON format
  });

  if (!res.ok) {
    throw new Error("Settings could not be updated");
  }
}
