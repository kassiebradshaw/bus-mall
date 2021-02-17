'use strict';

// global variables
let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Product(name, fileExtension) {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks =0;
  allProducts.push(this);
}

new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'gif');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let productArray = [];
  productArray[0] = getRandomIndex();
  productArray[1] = getRandomIndex();
  productArray[2] = getRandomIndex();
  while (productArray[0] === productArray[1]) {
    productArray[1] = getRandomIndex();
  }
  while (productArray[0] === productArray[2]) {
    productArray[2] = getRandomIndex();
  }
  while (productArray[1] === productArray[2]) {
    productArray[2] = getRandomIndex();
  }

  imageOne.src = allProducts[productArray[0]].src;
  imageOne.title = allProducts[productArray[0]].name;
  allProducts[productArray[0]].views++;

  imageTwo.src = allProducts[productArray[1]].src;
  imageTwo.title = allProducts[productArray[1]].name;
  allProducts[productArray[1]].views++;

  imageThree.src = allProducts[productArray[2]].src;
  imageThree.title = allProducts[productArray[2]].name;
  allProducts[productArray[2]].views++;
}

function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
  }

  totalClicks++;
  let productClicked = event.target.title;

  for (let i=0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event) {
  if(totalClicks === clicksAllowed) {
    renderResults();
  }
}

renderProducts();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);
