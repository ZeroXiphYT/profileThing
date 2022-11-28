const orderLink = document.getElementById('orderLink');
const createLink = document.getElementById('createLink');
const createOrderLink = document.getElementById('createOrderLink');
const userOrderLink = document.getElementById('userOrderLink');

var colorArray = ["primary", "secondary", "success", "info", "dark"];

function bootstrapClass(element, colorArray) {
    element.removeAttribute('class');
    var randomIndex = Math.floor(Math.random() * (colorArray.length - 0) + 0);
    var color = colorArray[randomIndex];
    element.classList.add('btn');
    element.classList.add(`btn-${color}`);
}

bootstrapClass(orderLink, colorArray);
bootstrapClass(createLink, colorArray);
bootstrapClass(createOrderLink, colorArray);
bootstrapClass(userOrderLink, colorArray);