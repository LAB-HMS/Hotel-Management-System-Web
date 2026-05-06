import { state, updateState } from "./state.js";
import { RoomCard } from "./components/RoomCard.js";

function renderApp() {
  const container = document.getElementById("room-grid");
  container.innerHTML = state.rooms.map((room) => RoomCard(room)).join("");
}

renderApp();
window.addEventListener("stateChange", renderApp);

function handleBooking(roomId) {
  const roomIndex = state.rooms.findIndex((room) => room.id === roomId);

  if (roomIndex !== -1) {
    const room = state.rooms[roomIndex];

    state.rooms[roomIndex].status = "OCCUPIED";

    updateState({ rooms: state.rooms });

    const confirmationMessage = `Room ${room.roomNumber} successfully booked!`;
    console.log(confirmationMessage);
    window.alert(confirmationMessage);
  }
}

// Event Delegation and action listener for booking rooms
document.getElementById("room-grid").addEventListener("click", (event) => {
  if (event.target.classList.contains("book-btn")) {
    const roomId = event.target.getAttribute("data-id");
    handleBooking(roomId);
  }
});
