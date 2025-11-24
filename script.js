const sheetID = "1zIVir4Sv-X5X7bdeSjCRSv5EF4JjgQCXo44W1k7iYLU";
const sheetName = "Travel offers";

const url = `https://docs.google.com/spreadsheets/d/1zIVir4Sv-X5X7bdeSjCRSv5EF4JjgQCXo44W1k7iYLU/edit?usp=sharing`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substring(47, data.length - 2));

    const rows = json.table.rows;
    const offersContainer = document.getElementById("offers-container");

    rows.forEach(row => {
      const cells = row.c;

      const destination = cells[0]?.v || "";
      const price = cells[1]?.v || "";
      const imageUrl = cells[2]?.v || "";
      const description = cells[3]?.v || "";
      const paymentLink = cells[4]?.v || "#";

      const card = document.createElement("div");
      card.className = "offer";

      card.innerHTML = `
        <img src="${imageUrl}" alt="${destination}">
        <div class="offer-content">
          <h3>${destination}</h3>
          <p><strong>${price}</strong></p>
          <p>${description}</p>
          <a href="${paymentLink}" target="_blank">Book Now</a>
        </div>
      `;

      offersContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load Google Sheet:", err));
