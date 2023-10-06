import { NextFunction, Request, Response } from "express";
import Book from "../models/Book.js";
import { BookService } from "../services/BookService.js";

const bookService = new BookService();

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { author, title } = req.body;

  try {
    const result = await bookService.createBook({ author, title });
    if (!result.success) return res.status(400).json(result);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  try {
    const result = await bookService.fetchBookById(bookId);
    if (!result.success) return res.status(404).json(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookService.fetchAllBooks();
    if (!result.success) return res.status(404).json(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  try {
    const result = await bookService.updateBook(bookId, req.body);
    if (!result.success && result.error.search(/not_found/gi) !== -1)
      return res.status(404).json(result);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findByIdAndDelete(bookId);
    return book
      ? res.status(201).json({ book, message: "Deleted" })
      : res.status(404).json({ message: "not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
