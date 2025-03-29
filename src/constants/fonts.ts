export const fonts = ["Jost", "Roboto", "OpenSans"] as const;

type font = (typeof fonts)[number];

export const fontWeights = [
  "Thin",
  "ExtraThin",
  "Light",
  "Regular",
  "Medium",
  "SemiBold",
  "Bold",
  "ExtraBold",
  "Black",
] as const;

type fontWeight = (typeof fontWeights)[number];

export const loadedFonts = [
  getFont("Jost", "Regular"),
  getFont("Jost", "Medium"),
  getFont("Jost", "SemiBold"),
  getFont("Roboto", "Medium"),
  getFont("Roboto", "Regular"),
  getFont("Roboto", "Bold"),
  getFont("OpenSans", "Regular"),
  getFont("OpenSans", "Medium"),
  getFont("OpenSans", "SemiBold"),
  getFont("OpenSans", "Bold"),
];

export type tLoadedFonts = (typeof loadedFonts)[number];

function getFont(
  fontType: font,
  fontWeight: fontWeight,
  italic: boolean = false
): string {
  const index = fontWeights.indexOf(fontWeight);

  if (index === -1) {
    throw new Error(`Invalid font weight: ${fontWeight}`);
  }

  return `${fontType}_${(index + 1) * 100}${fontWeight}${
    italic ? "_Italic" : ""
  }`;
}

export default function font(
  fontType: font,
  fontWeight: fontWeight,
  italic: boolean = false
): string {
  const selectedFont = getFont(fontType, fontWeight, italic);

  if (loadedFonts.indexOf(selectedFont) === -1) {
    return getFont("Jost", "Regular");
  }

  return selectedFont;
}
