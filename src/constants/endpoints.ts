import { searchBooks } from "@/helpers/books";

export const endpoints = {
  login: "https://boltikitabain.pk:8443/api/users/login",
  register: "https://boltikitabain.pk:8443/api/users/register",
  books: "https://boltikitabain.pk:8443/api/books",
  image: "https://boltikitabain.pk:8443/images",
  categories: "https://boltikitabain.pk:8443/api/categories",
  filteredBooks: "https://boltikitabain.pk:8443/api/books/filtered",
  searchBooks: "https://boltikitabain.pk:8443/api/books/search",
  chapters: "https://boltikitabain.pk:8443/api/chapters",
  audios: "https://boltikitabain.pk:8443/audios",
} as const;
