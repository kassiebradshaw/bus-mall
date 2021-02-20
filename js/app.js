'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let productArray = [];
let uniqueImageCount = 6;
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

let retrieveProducts = localStorage.getItem('products'); 

if (retrieveProducts) {
  let parsedProducts = JSON.parse(retrieveProducts);
  allProducts = parsedProducts;
} else {
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
}

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  while (productArray.length < uniqueImageCount) {
    let randomNumber = getRandomIndex();
    while (!productArray.includes(randomNumber)) {
      productArray.unshift(randomNumber);
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

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
  }

  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderChart();
  }

  let stringifiedProducts = JSON.stringify(allProducts);

  localStorage.setItem('products', stringifiedProducts);
}

renderProducts();

function renderChart() {

  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  var ctx = document.getElementById('myChart');
  Chart.defaults.global.defaultFontColor = 'black';
  Chart.defaults.global.defaultFontSize = 20;
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2.5,
        barThickness: 18,
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2.5,
        barThickness: 18,
      }]
    },
    options: {
      fontSize: 20,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

myContainer.addEventListener('click', handleClick);
