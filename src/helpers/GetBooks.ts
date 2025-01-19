import { book, tGenres } from "@/constants/types";

export function getBooksInGenre(genre: tGenres, num: number): Array<book> {
  const data: Array<book> = [];

  for (let i = 0; i < num; i++) {
    data.push({
      name: `Harry Potter and the Sorcerer's Stone`,
      image: "none",
      author: "Ali Muhammad",
      length: 100,
      genre: genre,
      rating: 4.5,
      description:
        "An 11-year-old orphan living with his unwelcoming aunt, uncle, and cousin, who learns of his own fame as a wizard known to have survived his parents' murder at the hands of the dark wizard Lord Voldemort as an infant when he is accepted to Hogwarts School of Witchcraft and Wizardry.",
      id: "100",
      tags: ["feel good", "funny", "aliens", "magic"],
    });
  }
  return data;
}

// export function getBooks(start: number, end: number, params: {
//   genre?: tGenres,
//   sortBy: ""
// })
