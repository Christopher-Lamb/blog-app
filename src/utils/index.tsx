export { default as generateUID } from "./generateUID";
export { default as moveItemDND } from "./moveItemDND";

export const h1Content = (htmlStr: string | undefined) => {
  // Create a temporary DOM element to hold the HTML
  if (!htmlStr) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlStr;

  // Extract the first h1 element
  const h1Element = tempDiv.querySelector("h1");

  // Check if an h1 element was found
  if (!h1Element) {
    return null; // Return null if no h1 element is found
  }
  // Return the text content of the h1 element, which automatically decodes entities
  return h1Element.textContent + " | ";
};


const isDevelopment = process.env.NODE_ENV === "development";
const basePath = isDevelopment ? "" : "/blog-app";

export function navigateTo(page: string) {
  location.href = `${basePath}/${page}`;
}
