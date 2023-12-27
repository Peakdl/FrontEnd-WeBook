async function displayEvents() {
  try {
    const response = await fetch("http://localhost:3005/event/get_all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const events = await response.json();

    todoList.innerHTML = "";

    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "grid-item";

      eventCard.innerHTML = `
      <div class="card">
      <img class="card-img" src="${event.image}" alt="Event picture">
      <div class="card-content">
          <h1 class="card-header">${event.title}</h1>
          <p class="card-text">${event.description}</p>
          <p>Location: ${event.location}</p>
          <p>Start: ${new Date(event.startDate).toLocaleString()}</p>
          <p>End: ${new Date(event.endDate).toLocaleString()}</p>
          <p>Available Tickets: ${event.avalible_ticket}</p>
          <p>Price: ${event.price}</p>
          <p>Discount: ${event.discount}%</p>
          <p>Final Price: ${event.final_price}</p>
          <p>Discount End: ${new Date(event.discount_end).toLocaleString()}</p>
          <button class="card-btn">Visit <span>&rarr;</span></button>
      </div>
  </div>
      `;

      todoList.appendChild(eventCard);
    });
  } catch (error) {
    console.error("Error fetching events", error);
  }
}
