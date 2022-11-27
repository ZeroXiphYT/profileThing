const orderLink = document.getElementById('orderLink');
const createLink = document.getElementById('createLink');
const createOrderLink = document.getElementById('createOrderLink');
const userOrderLink = document.getElementById('userOrderLink');

var colorArray = ["primary", "secondary", "success", "info", "dark"];

function setRandomClass(element, colorArray) {
    element.removeAttribute('class');
    var randomIndex = Math.floor(Math.random() * (colorArray.length - 0) + 0);
    var color = colorArray[randomIndex];
    element.classList.add('btn');
    element.classList.add(`btn-${color}`);
}

setRandomClass(orderLink, colorArray);
setRandomClass(createLink, colorArray);
setRandomClass(createOrderLink, colorArray);
setRandomClass(userOrderLink, colorArray);