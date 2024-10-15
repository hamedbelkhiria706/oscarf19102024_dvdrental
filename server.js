const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
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

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
