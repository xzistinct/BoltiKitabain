export function PrettyPrintName(name: string) {
  const nameParts = name.split(" ");
  const formattedName =
    nameParts.length > 1
      ? nameParts[0] + " " + nameParts[1].charAt(0).toUpperCase() + "."
      : name.charAt(0).toUpperCase() + name.slice(1);
  return formattedName;
}
