export const normalizeString = (str) => {
  return str?.toLowerCase()?.replace(/\s/g, "_");
};
