export const initialState = {
  rooms: [
    {
      id: "101",
      roomNumber: "101",
      type: "SINGLE",
      basePrice: 100,
      status: "AVAILABLE",
    },
    {
      id: "102",
      roomNumber: "102",
      type: "DOUBLE",
      basePrice: 150,
      status: "OCCUPIED",
    },
    {
      id: "103",
      roomNumber: "103",
      type: "SUITE",
      basePrice: 250,
      status: "MAINTENANCE",
    },
  ],
  guests: [],
  bookings: [],
};

// A simple global state object
export let state = { ...initialState };

export const updateState = (newState) => {
  state = { ...state, ...newState };
  // Trigger a re-render (Student will implement this in main.js)
  window.dispatchEvent(new CustomEvent("stateChange"));
};
