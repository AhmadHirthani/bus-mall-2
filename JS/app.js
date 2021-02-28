/* eslint-disable space-in-parens */
/* eslint-disable eqeqeq */
'use strict';

let productsArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'shark',
  'sweep',
  'scissors',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];

const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

let Resultbutton = document.getElementById('resultButton');
Resultbutton.style.visibility='hidden';




function Products(name) {
  this.name = name;

  if (this.name === 'sweep') {
    this.image = `./img/${name}.png`;
  } else if (this.name === 'usb') {
    this.image = `./img/${name}.gif`;
  } else {
    this.image = `./img/${name}.jpg`;
  }

  this.clicks = 0;
  this.shown = 0;
  Products.all.push(this);

}

Products.all = [];
Products.counter = 0;
let leftProductsIndex = 0;
let rightProductsIndex = 0;
let centerProductsIndex = 0;


for (let i = 0; i < productsArray.length; i++) {
  new Products(productsArray[i]);
}


function renderNewProducts() {
  let leftIndex = randomNumber(0, Products.all.length - 1);
  leftImage.src = Products.all[leftIndex].image;
  leftImage.alt = Products.all[leftIndex].name;
  leftProductsIndex = leftIndex;

  let rightIndex;
  do {
    rightIndex = randomNumber(0, Products.all.length - 1);
  } while (leftIndex === rightIndex);

  rightImage.src = Products.all[rightIndex].image;
  rightImage.alt = Products.all[rightIndex].name;
  rightProductsIndex = rightIndex;

  let centerIndex;

  do {
    centerIndex = randomNumber(0, Products.all.length - 1);

  } while (leftIndex === centerIndex || centerIndex === rightIndex);

  centerImage.src = Products.all[centerIndex].image;
  centerImage.alt = Products.all[centerIndex].name;
  centerProductsIndex = centerIndex;


  Products.all[leftIndex].shown++;
  Products.all[centerIndex].shown++;
  Products.all[rightIndex].shown++;

}




function handelClick(event) {

  const clickedElement = event.target;
  if (Products.counter <= 25) {


    if (clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage') {

      if (clickedElement.id === 'leftImage') {
        Products.all[leftProductsIndex].clicks++;
      }

      if (clickedElement.id === 'centerImage') {
        Products.all[centerProductsIndex].clicks++;
      }

      if (clickedElement.id === 'rightImage') {
        Products.all[rightProductsIndex].clicks++;
      }

      Products.counter++;
      renderNewProducts();
      console.log(Products.all);
    }
  }
  else {

    Resultbutton.style.visibility = 'visible';
    Resultbutton.addEventListener('click', function showResult() {
      const parentElement = document.getElementById('showresults');
      const ulElement = document.createElement('ul');
      parentElement.appendChild(ulElement);

      for (let i = 0; i < Products.all.length; i++) {
        const liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = Products.all[i].name + ' had ' + Products.all[i].clicks + ' votes , and was seen ' + Products.all[i].shown + ' times';

      }
    });
    imageSection.removeEventListener('click', handelClick);

  }

}


imageSection.addEventListener('click', handelClick);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

renderNewProducts();
