import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();


app.use(express.json());


mongoose.connect("mongodb://localhost:27017/bookstore")
.then(() => console.log(" MongoDB connecté"))
.catch((err) => {
    console.error(" Connexion MongoDB échouée :", err.message);
});


app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});