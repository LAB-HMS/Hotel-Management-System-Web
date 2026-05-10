import { state, updateState } from "./state.js";
import { RoomCard } from "./components/RoomCard.js";

// Modal state
let currentBookingRoomId = null;

function renderApp() {
  const container = document.getElementById("room-grid");
  container.innerHTML = state.rooms.map((room) => RoomCard(room)).join("");
}

renderApp();
window.addEventListener("stateChange", renderApp);

// Modal handling
const modal = document.getElementById("booking-modal");
const bookingForm = document.getElementById("booking-form");
const guestNameInput = document.getElementById("guest-name");
const nightsInput = document.getElementById("nights");
const cancelBtn = document.getElementById("cancel-booking");

function openModal(roomId) {
  currentBookingRoomId = roomId;
  modal.hidden = false;
  guestNameInput.focus();
}

function closeModal() {
  modal.hidden = true;
  guestNameInput.value = "";
  nightsInput.value = "1";
  currentBookingRoomId = null;
}

function submitBooking(event) {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();
  const nights = parseInt(nightsInput.value);

  // Validation
  if (!guestName) {
    alert("Guest Name is required");
    return;
  }

  if (nights < 1) {
    alert("Number of Nights must be at least 1");
    return;
  }

  if (!currentBookingRoomId) {
    alert("Error: No room selected");
    return;
  }

  // Find the room
  const roomIndex = state.rooms.findIndex(
    (room) => room.id === currentBookingRoomId,
  );
  if (roomIndex === -1) {
    alert("Error: Room not found");
    return;
  }

  const room = state.rooms[roomIndex];

  // Create booking record
  const booking = {
    id: `BK${Date.now()}`,
    roomId: room.id,
    roomNumber: room.roomNumber,
    guestName: guestName,
    nights: nights,
    totalPrice: room.basePrice * nights,
    bookingDate: new Date().toISOString(),
  };

  // Update state
  state.rooms[roomIndex].status = "OCCUPIED";
  state.bookings.push(booking);

  updateState({
    rooms: state.rooms,
    bookings: state.bookings,
  });

  console.log(
    `Booking confirmed: ${guestName} for Room ${room.roomNumber} for ${nights} night(s)`,
  );
  closeModal();
}

// Event listeners
bookingForm.addEventListener("submit", submitBooking);
cancelBtn.addEventListener("click", closeModal);

// Event Delegation for opening modal on "Book Now" click
document.getElementById("room-grid").addEventListener("click", (event) => {
  if (event.target.classList.contains("book-btn")) {
    const roomId = event.target.getAttribute("data-id");
    openModal(roomId);
  }
});
