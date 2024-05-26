import { getToday } from "../utils/helpers";
import supabase from "./supabase";
const VITE_BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
const PAGE_SIZE = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE);
export async function getBookings({ filter, sortBy, page }) {
  if (filter !== null || sortBy !== null) {
    let body = {};
    console.log(filter, sortBy);
    if (filter && sortBy) {
      body = {
        [filter.field]: filter.value,
        sortField: sortBy.field,
        sortDirection: sortBy.direction ?? "ASC",
      };
    } else if (sortBy) {
      body = {
        sortField: sortBy.field,
        sortDirection: sortBy.direction ?? "ASC",
      };
    } else if (filter) {
      body = {
        [filter.field]: filter.value,
      };
    }
    body.page = page;
    body.pageSize = PAGE_SIZE;
    console.log(body, "body");
    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bookings`, {
      method: "POST", // HTTP request method

      headers: {
        "Content-Type": "application/json", // Request content type
        // Add other headers if needed, such as Authorization header
      },
      referrerPolicy: "no-referrer", // Referrer policy
      // eslint-disable-next-line no-undef
      body: JSON.stringify(body), // Request payload data, converted to JSON format
    });
    if (!response.ok) {
      throw new Error("Cabins could not be loaded");
    }
    const newData = await response.json();

    return newData?.result ?? [];
  } else {
    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bookings`);
    if (!response.ok) {
      throw new Error("Cabins could not be loaded");
    }
    const newData = await response.json();

    return newData?.result ?? [];
  }
}
export async function getBooking(id) {
  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/booking/${id}`);
  if (!response.ok) {
    throw new Error("Booking could not be loaded");
  }
  const newData = await response.json();
  console.log(newData);
  return newData?.result ?? {};
}
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate( daysGap ) {
  let body = {};

  body.daysGap = parseInt(daysGap);
  body.type = "bookings";

  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bookingsAfterDate`, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
    },
    referrerPolicy: "no-referrer", // Referrer policy

    body: JSON.stringify(body), // Request payload data, converted to JSON format
  });
  if (!response.ok) {
    throw new Error("Bookings could not be loaded");
  }
  const newData = await response.json();

  return newData?.result?.bookings ?? [];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate( daysGap ) {
  let body = {};

  body.daysGap = parseInt(daysGap);
  body.type = "stays";

  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bookingsAfterDate`, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
    },
    referrerPolicy: "no-referrer", // Referrer policy

    body: JSON.stringify(body), // Request payload data, converted to JSON format
  });
  if (!response.ok) {
    throw new Error("Stays could not be loaded");
  }
  const newData = await response.json();

  return newData?.result?.stays ?? [];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/getStaysTodayActivity`);
  if (!response.ok) {
    throw new Error("Booking could not be loaded");
  }
  const newData = await response.json();
  console.log(newData);
  return newData?.result ?? {};
}

export async function updateBooking(obj) {
  const body = {
    ...obj,
    id: parseInt(obj.id),
  };
  console.log(body);
  const response = await fetch(`${VITE_BACKEND_ENDPOINT}/updateBooking`, {
    method: "POST", // HTTP request method

    headers: {
      "Content-Type": "application/json", // Request content type
      // Add other headers if needed, such as Authorization header
    },
    referrerPolicy: "no-referrer", // Referrer policy
    // eslint-disable-next-line no-undef
    body: JSON.stringify(body), // Request payload data, converted to JSON format
  });
  if (!response.ok) {
    throw new Error("Booking could not be loaded");
  }
  const newData = await response.json();

  return newData?.result ?? {};
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES

  const res = await fetch(`${VITE_BACKEND_ENDPOINT}/deleteBooking/${id}`);

  if (!res.ok) {
    throw new Error("Booking could not be loaded");
  }

  const data = await res.json();

  return data?.result ?? {};
}
