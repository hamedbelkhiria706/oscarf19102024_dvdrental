const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Pour servir les fichiers statiques
const db = require("mongoose");

db.connect("mongodb://127.0.0.1:27017/dvdrental", (error) => {
  console.log("error" + error);
});
// Connexion à MongoDB
// TODO: Importez Mongoose et établissez une connexion à la base de données MongoDB.
// Utilisez mongoose.connect() pour vous connecter à votre instance MongoDB.
// Assurez-vous de gérer les erreurs de connexion.

// Modèle de DVD
// TODO: Créez un schéma Mongoose pour le modèle DVD.
// Incluez des champs tels que title, genre, releaseYear, et available.
// Créez le modèle à partir du schéma avec mongoose.model().
const DVD = db.Schema({
  //dvdId: db.Types.ObjectId,
  title: { String, required: True },
  rentalName: { String, required: true },
  releaseYear: { Number, required: true },
  available: { Boolean, required: true, default: true },
});
const DVDm = db.model("dvd", { schema: DVD });
const RENTAL = db.Schema({
  dvdId: { type: db.Schema.Types.ObjectId, ref: "DVDm" },
  customerName: { String, required: true },
});

const RENTALm = db.model("rental", { schema: RENTAL });
// Modèle de location
// TODO: Créez un schéma Mongoose pour le modèle de location.
// Incluez des champs tels que dvdId (référence au modèle DVD) et renterName.
// Créez le modèle à partir du schéma avec mongoose.model().

// CRUD pour DVDs

// 1. Récupérer tous les DVDs
app.get("/dvds", async (req, res) => {
  // TODO: Implémentez la logique pour récupérer tous les DVDs depuis la base de données
});

// 2. Récupérer un DVD par son ID
app.get("/dvds/:id", async (req, res) => {
  // TODO: Implémentez la logique pour récupérer un DVD spécifique par son ID depuis la base de données
});

// 3. Ajouter un nouveau DVD
app.post("/dvds", async (req, res) => {
  // TODO: Implémentez la logique pour ajouter un nouveau DVD dans la base de données
});

// 4. Mettre à jour un DVD existant
app.put("/dvds/:id", async (req, res) => {
  // TODO: Implémentez la logique pour mettre à jour un DVD existant dans la base de données
});

// 5. Supprimer un DVD
app.delete("/dvds/:id", async (req, res) => {
  // TODO: Implémentez la logique pour supprimer un DVD de la base de données
});

// CRUD pour locations

// 1. Récupérer toutes les locations
app.get("/rentals", async (req, res) => {
  // TODO: Implémentez la logique pour récupérer toutes les locations depuis la base de données
});

// 2. Ajouter une nouvelle location
app.post("/rentals", async (req, res) => {
  // TODO: Implémentez la logique pour ajouter une nouvelle location dans la base de données
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
