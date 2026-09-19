// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){

  //get the query string part of the URL
  const queryString = window.location.search;
  //get the parmemters of the url
  const urlParams = new URLSearchParams(queryString);
  //get the desired parmeter
  const product = urlParams.get(param);
  return product;
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
     callback(data)
  };
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
export async function loadHeaderFooter() {

const headerTemplate = await loadTemplate("../partials/header.html");
const footerTemplate = await loadTemplate("../partials/footer.html");
const headerElement = document.querySelector("#main-header");
const footerElement = document.querySelector("#main-footer");
renderWithTemplate(headerTemplate, headerElement);
renderWithTemplate(footerTemplate, footerElement);
} 