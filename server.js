const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Connecting to MongoDB

// DVD Schema and Model

// Rental Schema and Model

// Serve frontend HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Routes CRUD à compléter
app.post("/dvds", (req, res) => {
  // Logic à compléter pour créer un DVD
});

app.get("/dvds", (req, res) => {
  // Logic à compléter pour lire tous les DVDs
});

app.patch("/dvds/:id", (req, res) => {
  // Logic à compléter pour mettre à jour un DVD
});

app.delete("/dvds/:id", (req, res) => {
  // Logic à compléter pour supprimer un DVD
});

app.post("/rentals", (req, res) => {
  // Logic à compléter pour créer une location
});

app.patch("/rentals/:id/return", (req, res) => {
  // Logic à compléter pour marquer un DVD comme retourné
});

// Start the server
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
