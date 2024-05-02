import supabase from "./supabase";

export async function getSettings() {
  const res = await fetch("http://127.0.0.1:8080/settings");

  if (!res.ok) {
    throw new Error("Settings could not be loaded");
  }
  const data = await res.json();

  return data.result[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const res = await fetch("http://127.0.0.1:8080/updateSettings", {
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
