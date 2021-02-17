'use strict';

// global variables
let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Product(name, fileExtension) {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks =0;
  allProducts.push(this);
}


