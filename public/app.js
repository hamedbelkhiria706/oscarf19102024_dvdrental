const dvdListElement = document.getElementById("dvd-list");
const rentalListElement = document.getElementById("rental-list");
const dvdSelectElement = document.getElementById("dvd-select");

document
  .getElementById("add-dvd-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseYear = document.getElementById("releaseYear").value;

    try {
      const response = await fetch("http://localhost:3000/dvds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, genre, releaseYear }),
      });
      const dvd = await response.json();
      alert("DVD ajouté avec succès");
      loadDvds();
    } catch (err) {
      console.error("Erreur lors de l’ajout du DVD", err);
    }
  });

document
  .getElementById("add-rental-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const dvdId = dvdSelectElement.value;
    const dueDate = document.getElementById("dueDate").value;

    try {
      const response = await fetch("http://localhost:3000/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerName, dvd: dvdId, dueDate }),
      });
      const rental = await response.json();
      alert("Location ajoutée avec succès");
      loadRentals();
    } catch (err) {
      console.error("Erreur lors de l’ajout de la location", err);
    }
  });

async function loadDvds() {
  try {
    const response = await fetch("http://localhost:3000/dvds");
    const dvds = await response.json();

    dvdListElement.innerHTML = "";
    dvdSelectElement.innerHTML = "";

    dvds.forEach((dvd) => {
      const dvdElement = document.createElement("div");
      dvdElement.textContent = `${dvd.title} (${dvd.genre}, ${
        dvd.releaseYear
      }) - Disponible: ${dvd.available ? "Oui" : "Non"}`;
      dvdListElement.appendChild(dvdElement);

      const option = document.createElement("option");
      option.value = dvd._id;
      option.textContent = dvd.title;
      dvdSelectElement.appendChild(option);
    });
  } catch (err) {
    console.error("Erreur lors du chargement des DVDs", err);
  }
}

async function loadRentals() {
  try {
    const response = await fetch("http://localhost:3000/rentals");
    const rentals = await response.json();

    rentalListElement.innerHTML = "";

    rentals.forEach((rental) => {
      const rentalElement = document.createElement("div");
      rentalElement.textContent = `${rental.customerName} a loué "${
        rental.dvd.title
      }" le ${new Date(
        rental.rentedOn
      ).toLocaleDateString()} à retourner avant le ${new Date(
        rental.dueDate
      ).toLocaleDateString()} - Retourné: ${rental.returned ? "Oui" : "Non"}`;
      rentalListElement.appendChild(rentalElement);
    });
  } catch (err) {
    console.error("Erreur lors du chargement des locations", err);
  }
}

// Charger les données au démarrage
loadDvds();
loadRentals();
