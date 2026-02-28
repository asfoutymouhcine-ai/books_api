import Book from "../model/Book.js";
import Category from "../model/Category.js";
import mongoose from "mongoose";


export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category"); // si category est lié
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const book = await Book.findById(id).populate("category");
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const addBook = async (req, res) => {
  try {
    const { title, auteur, price, publishedAt, category } = req.body;

    
    if (!title || !auteur) {
      return res.status(400).json({ message: "Title et auteur sont requis" });
    }

    const newBook = new Book({
      title,
      auteur,
      price: price || 0,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      category: category || null
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json({ message: `Livre '${deletedBook.title}' supprimé avec succès` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

