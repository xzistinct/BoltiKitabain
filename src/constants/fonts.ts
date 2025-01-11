export const fonts = ["Jost"] as const;

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

export default function font(
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
