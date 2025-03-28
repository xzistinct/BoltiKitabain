import { book, tError, tGenres } from "@/constants/types";
import { endpoints } from "./endpoints";
import { errors } from "@/constants/errors";

export function getImageURL(id: string): string {
  return endpoints.image + "/" + id;
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
    let books: book[] = data.filter((book: any) => {
      const json = parseBookJSON(book);
      if (typeof json !== "object") {
        return false; // Skip elements where json is an error
      }
      return json;
    });

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
