import Book, { IBook, IBookModel } from "../models/Book.js";
import { Result } from "../types/index.js";

export class BookService {
  async createBook(bookData: IBook): Promise<Result<IBookModel>> {
    const book = new Book(bookData);
    await book.save();
    return { success: true, payload: book };
  }

  // create fetchBook by id method with try/catch and returns Result<IBookModel>
  async fetchBookById(bookId: string): Promise<Result<IBookModel>> {
    const book = await Book.findById(bookId);
    if (!book) {
      return { success: false, error: "book_not_found" };
    }
    return { success: true, payload: book };
  }

  async fetchAllBooks(): Promise<Result<IBookModel[]>> {
    const books = await Book.find();
    return { success: true, payload: books };
  }

  async updateBook(
    bookId: string,
    bookData: IBook
  ): Promise<Result<IBookModel>> {
    const book = await Book.findById(bookId);
    if (!book) return { success: false, error: "book_not_found" };

    book.title = bookData.title;
    book.author = bookData.author;

    const res = await book.save();
    if (book !== res) return { success: false, error: "book_not_updated" };
    return { success: true, payload: book };
  }
}
