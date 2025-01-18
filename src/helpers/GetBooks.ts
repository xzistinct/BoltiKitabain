import { book, tGenres } from "@/constants/types";

export function getBooksInGenre(genre: tGenres, num: number): Array<book> {
  const data: Array<book> = [];

  for (let i = 0; i < num; i++) {
    data.push({
      name: `${genre} book #${i}`,
      image: "none",
      author: "Ali Muhammad",
      length: 100,
      genre: genre,
      rating: 4.5,
      description: "This is a book",
      id: "100",
      tags: ["tag1", "tag2"],
    });
  }
  return data;
}
