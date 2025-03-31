import { book, tError, tGenres } from "@/constants/types";
import { endpoints } from "../constants/endpoints";
import { errors } from "@/constants/errors";

export function getImageURL(id: string): string {
  return endpoints.image + "/" + id;
}

export function getAudioURL(id: string): string {
  return endpoints.audios + "/" + id;
}

export function parseBookJSON(bookJSON: any): book | tError {
  try {
    const response = {
      name: bookJSON["title"],
      name_urdu: bookJSON["titleUrdu"],
      image: bookJSON["image"],
      description: bookJSON["description"],
      id: bookJSON["_id"],
      author: bookJSON["author"],
      genre: [
        bookJSON["genre"],
        bookJSON["categories"],
        bookJSON["subCategory"],
      ].flat(),
      narrator: bookJSON["narrator"],
      contributor: bookJSON["contributor"],
    };
    return response;
  } catch (error) {
    console.error("Error parsing book JSON:", error);
    return errors["Failed to parse server response"];
  }
}

export async function getPopularBooks(): Promise<book[] | tError> {
  const response = await fetch(endpoints.books);
  if (!response.ok) {
    return errors["Failed to get appropriate response from server"];
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      return errors["Failed to get appropriate response from server"];
    }
    const books: book[] = data
      .map((bookData: any) => parseBookJSON(bookData))
      .filter((result) => typeof result === "object");

    if (books.length === 0) {
      return errors["Failed to get appropriate response from server"];
    }

    return books;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to parse server response"];
  }
}

export async function getBookById(
  id: string,
  jwt: string
): Promise<book | tError> {
  const response = await fetch(endpoints.books + "/" + id, {
    headers: {
      "x-auth-token": jwt,
    },
    body: null,
    method: "GET",
  });
  if (!response.ok) {
    return errors["Failed to get appropriate response from server"];
  }

  try {
    const data = await response.json();
    if (!data) {
      return errors["Failed to get appropriate response from server"];
    }
    return parseBookJSON(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to parse server response"];
  }
}

export async function getBookCategories(): Promise<string[] | tError> {
  const response = await fetch(endpoints.categories);
  if (!response.ok) {
    return errors["Failed to get appropriate response from server"];
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      return errors["Failed to get appropriate response from server"];
    }
    const categories = data
      .map((category: any) => category.name)
      .filter((name: string | undefined) => name !== "" && name !== undefined);

    if (categories.length === 0) {
      return errors["Failed to get appropriate response from server"];
    }

    return categories;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to parse server response"];
  }
}

export async function getBooksByCategory(
  category: string,
  jwt: string
): Promise<book[] | tError> {
  try {
    const response = await fetch(endpoints.filteredBooks, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt,
      },
      body: JSON.stringify({ parentVal: category, genreVal: "", subVal: "" }),
    });
    if (!response.ok) {
      return errors["Failed to get appropriate response from server"];
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      return errors["Failed to get appropriate response from server"];
    }
    let books: book[] = data
      .map((bookData: any) => parseBookJSON(bookData))
      .filter((result) => typeof result === "object");

    return books;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    return errors["Failed to get appropriate response from server"];
  }
}

export async function searchBooks(
  query: string,
  jwt: string
): Promise<book[] | tError> {
  try {
    const response = await fetch(endpoints.searchBooks, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt,
      },
      body: JSON.stringify({ searchVal: query }),
    });
    if (!response.ok) {
      return errors["Failed to get appropriate response from server"];
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      return errors["Failed to get appropriate response from server"];
    }
    let books: book[] = data
      .map((bookData: any) => parseBookJSON(bookData))
      .filter((result) => typeof result === "object");

    return books;
  } catch (error) {
    console.error("Error searching books:", error);
    return errors["Failed to get appropriate response from server"];
  }
}

function parseChapterData(chapterJSON: any) {
  if (typeof chapterJSON !== "object" || !chapterJSON) {
    return errors["Failed to parse server response"];
  }
  return {
    name: chapterJSON.title,
    id: chapterJSON._id,
    tags: chapterJSON.tags,
    name_urdu: chapterJSON.titleUrdu,
    audio_id: chapterJSON.audio,
  };
}

export async function getBookChapters(
  id: string,
  jwt: string
): Promise<
  { chapters: book["chapters"]; num: book["numberOfChapters"] } | tError
> {
  const response = await fetch(endpoints.chapters + "/" + id, {
    headers: {
      "x-auth-token": jwt,
    },
    body: null,
    method: "GET",
  });
  if (!response.ok) {
    return errors["Failed to get appropriate response from server"];
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      return errors["Failed to get appropriate response from server"];
    }
    return {
      num: data.length - 1,
      chapters: data
        .map(parseChapterData)
        .filter((result) => typeof result === "object"),
    };
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to parse server response"];
  }
}
