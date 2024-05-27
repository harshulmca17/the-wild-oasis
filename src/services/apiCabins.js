/* eslint-disable import/no-anonymous-default-export */
import supabase from "./supabase";
const VITE_BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
export async function getCabins() {
  const res = await fetch(`${VITE_BACKEND_ENDPOINT}/cabins`);

  if (!res.ok) {
    throw new Error("Cabins could not be loaded");
  }

  const data = await res.json();

  return data;
}

export async function deleteCabins(id) {
  const res = await fetch(`${VITE_BACKEND_ENDPOINT}/deleteCabin/${id}`);

  if (!res.ok) {
    throw new Error("Cabins could not be loaded");
  }

  const data = await res.json();

  return data;
}

export async function createEditCabin(cabin, id) {
  console.log(cabin, id);

  const hasStartswithSupabase = typeof cabin.image === "string" ?? false;

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasStartswithSupabase
    ? cabin.image
    : `/storage/v1/object/public/cabin-images/` + imageName;

  const body = { ...cabin };
  body.image = imagePath;

  let apiPath = `${VITE_BACKEND_ENDPOINT}/pushCabins`;

  if (id) apiPath = `${VITE_BACKEND_ENDPOINT}/updateCabin`;

  console.log(apiPath, id);
  const response = await fetch(apiPath, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
      // Add other headers if needed, such as Authorization header
    },
    referrerPolicy: "no-referrer", // Referrer policy
    body: JSON.stringify(body), // Request payload data, converted to JSON format
  });
  if (!response.ok) {
    throw new Error("Cabins could not be loaded");
  }
  const newData = await response.json();

  if (!hasStartswithSupabase) {
    const avatarFile = cabin.image;
    const { data, error } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, avatarFile);
    if (error) {
      deleteCabins(newData.result.id);
    }
  }

  // Wait for the response to resolve, and return the JSON-formatted response body
  return newData;
}

export async function updateCabin(cabin) {
  // console.log
  const body = { ...cabin };
  let imageName = "";
  if (cabin.image.name) {
    imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
    const imagePath = `/storage/v1/object/public/cabin-images/` + imageName;

    body.image = imagePath;
  }

  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/updateCabin`, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
      // Add other headers if needed, such as Authorization header
    },
    referrerPolicy: "no-referrer", // Referrer policy
    body: JSON.stringify(body), // Request payload data, converted to JSON format
  });
  if (!response.ok) {
    throw new Error("Cabins could not be loaded");
  }
  const newData = await response.json();

  if (cabin.image.name) {
    const avatarFile = cabin.image;
    const { data, error } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, avatarFile);

    // if (error) {
    //   deleteCabins(newData.result.id);
    // }
  } // Wait for the response to resolve, and return the JSON-formatted response body
  return newData;
}
// export default {getCabins,deleteCabins}
