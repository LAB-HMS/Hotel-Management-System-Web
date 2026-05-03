import { state } from "./state.js";
import { RoomCard } from "./components/RoomCard.js";

function renderApp() {
  const container = document.getElementById("room-grid");
  container.innerHTML = state.rooms.map(room => RoomCard(room)).join("");
}

renderApp();
