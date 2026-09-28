import { getCartCount } from './cart.mjs';

function displayCartCount(count){
document.querySelector('#cart-count').textContent = count;}


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


export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}


export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');// 
  const footerTemplate = await loadTemplate('../partials/footer.html');

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, getCartCount(), displayCartCount); //display # of items in cart
  renderWithTemplate(footerTemplate, footerElement);

}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  const alertText = document.createElement('p');
  alertText.innerHTML = message;

  const xButton = document.createElement('button');
  xButton.innerHTML = 'X';
  
  alert.appendChild(alertText);
  alert.appendChild(xButton);

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
      if( e.target.innerHTML == 'X') { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

/*export function removeAllAlerts(){
  document.getElementsByClassName('alert').array.forEach(alert => {
    document.removeChild(alert);
  });
}*/