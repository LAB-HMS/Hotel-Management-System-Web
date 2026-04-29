export function RoomCard(room) {
  const isAvailable = room.status === "AVAILABLE";
  return `
        <div class="room-card ${room.status.toLowerCase()}">
            <h3>Room ${room.roomNumber}</h3>
            <p>Type: ${room.type}</p>
            <p>Price: $${room.basePrice}</p>
            <button ${!isAvailable ? "disabled" : ""}>Book Now</button>
        </div>
    `;
}
