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

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks =0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}


let productArray = [];
function renderProducts() {
  while (productArray.length < 6) {
    let randomNumber = getRandomIndex();
    while (!productArray.includes(randomNumber)){
      productArray.push(randomNumber);
    }
  }

  let firstProduct = productArray.pop();
  let secondProduct = productArray.pop();
  let thirdProduct = productArray.pop();

  imageOne.src = allProducts[firstProduct].src;
  imageOne.title = allProducts[firstProduct].name;
  allProducts[firstProduct].views++;

  imageTwo.src = allProducts[secondProduct].src;
  imageTwo.title = allProducts[secondProduct].name;
  allProducts[secondProduct].views++;

  imageThree.src = allProducts[thirdProduct].src;
  imageThree.title = allProducts[thirdProduct].name;
  allProducts[thirdProduct].views++;
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
