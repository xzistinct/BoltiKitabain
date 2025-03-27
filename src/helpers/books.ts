import { book, tError, tGenres } from "@/constants/types";
import { endpoints } from "./endpoints";
import { errors } from "@/constants/errors";

export function getImageURL(id: string): string {
  return endpoints.image + "/" + id;
}

export function parseBookJSON(bookJSON: any): book {
  return {
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
}

export async function getPopularBooks(): Promise<book[] | tError> {
  const response = await fetch(endpoints.books);
  if (!response.ok) {
    return errors["Failed to get books"];
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      return errors["Failed to get books"];
    }
    let books = data.map((book: any) => {
      return parseBookJSON(book);
    });

    return books;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to get books"];
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
  console.log("Response", response);
  if (!response.ok) {
    return errors["Failed to get books"];
  }

  try {
    const data = await response.json();
    if (!data) {
      return errors["Failed to get books"];
    }
    return parseBookJSON(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return errors["Failed to get books"];
  }
}
