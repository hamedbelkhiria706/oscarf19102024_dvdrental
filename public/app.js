async function loadDvds() {
  const response = await fetch("http://localhost:3000/dvds");
  const dvds = await response.json();

  const dvdTableBody = document.querySelector("#dvdTable tbody");
  dvdTableBody.innerHTML = ""; // Vider le tableau avant de le remplir

  dvds.forEach((dvd) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${dvd.title}</td>
          <td>${dvd.genre}</td>
          <td>${dvd.releaseYear}</td>
          <td>${dvd.available ? "Oui" : "Non"}</td>
          <td>
              <button class="edit-dvd-button" data-dvd-id="${
                dvd._id
              }">Modifier</button>
          </td>
      `;
    dvdTableBody.appendChild(row);
  });

  attachEditButtonListeners();
}

async function addDvd(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const available = document.getElementById("available").checked;

  const dvdData = { title, genre, releaseYear, available };

  try {
    const response = await fetch("http://localhost:3000/dvds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dvdData),
    });

    if (response.ok) {
      alert("DVD ajouté avec succès");
      loadDvds(); // Recharger la liste des DVDs après ajout
      document.getElementById("addDvdForm").reset(); // Réinitialiser le formulaire
    } else {
      console.error(`Erreur ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout du DVD", err);
  }
}

async function loadDvdDetailsForEdit(dvdId) {
  try {
    const response = await fetch(`http://localhost:3000/dvds/${dvdId}`);
    const dvd = await response.json();

    document.getElementById("editTitle").value = dvd.title;
    document.getElementById("editGenre").value = dvd.genre;
    document.getElementById("editReleaseYear").value = dvd.releaseYear;
    document.getElementById("editAvailable").checked = dvd.available;
    document.getElementById("dvdIdField").value = dvd._id;

    // Afficher le formulaire de modification
    document.getElementById("editDvdForm").style.display = "block";
  } catch (err) {
    console.error("Erreur lors du chargement des détails du DVD", err);
  }
}

function attachEditButtonListeners() {
  const editButtons = document.querySelectorAll(".edit-dvd-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const dvdId = e.target.dataset.dvdId;
      await loadDvdDetailsForEdit(dvdId);
    });
  });
}

document
  .getElementById("confirmEditButton")
  .addEventListener("click", async () => {
    const dvdId = document.getElementById("dvdIdField").value;
    const title = document.getElementById("editTitle").value;
    const genre = document.getElementById("editGenre").value;
    const releaseYear = document.getElementById("editReleaseYear").value;
    const available = document.getElementById("editAvailable").checked;

    const dvdData = { title, genre, releaseYear, available };

    try {
      const response = await fetch(`http://localhost:3000/dvds/${dvdId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dvdData),
      });

      if (response.ok) {
        alert("DVD mis à jour avec succès");
        loadDvds(); // Recharger la liste des DVDs après modification
        document.getElementById("editDvdForm").style.display = "none"; // Cacher le formulaire
      } else {
        console.error(`Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du DVD", err);
    }
  });

document.getElementById("cancelEditButton").addEventListener("click", () => {
  document.getElementById("editDvdForm").style.display = "none"; // Cacher le formulaire
});

// Gérer l'ajout de locations
async function addRental(event) {
  event.preventDefault();

  const dvdRentalId = document.getElementById("dvdRentalId").value;
  const renterName = document.getElementById("renterName").value;

  const rentalData = { dvdId: dvdRentalId, renterName };

  try {
    const response = await fetch("http://localhost:3000/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    if (response.ok) {
      alert("Location ajoutée avec succès");
      loadRentals(); // Recharger la liste des locations après ajout
      document.getElementById("addRentalForm").reset(); // Réinitialiser le formulaire
    } else {
      console.error(`Erreur ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout de la location", err);
  }
}

// Fonction pour charger les locations
async function loadRentals() {
  const response = await fetch("http://localhost:3000/rentals");
  const rentals = await response.json();

  const rentalTableBody = document.querySelector("#rentalTable tbody");
  rentalTableBody.innerHTML = ""; // Vider le tableau avant de le remplir

  rentals.forEach((rental) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${rental.dvdId}</td>
          <td>${rental.renterName}</td>
      `;
    rentalTableBody.appendChild(row);
  });
}

document.getElementById("addRentalForm").addEventListener("submit", addRental);
document.getElementById("addDvdForm").addEventListener("submit", addDvd);

// Charger les DVDs et locations au chargement de la page
loadDvds();
loadRentals();
