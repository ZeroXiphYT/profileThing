const orderLink = document.getElementById('orderLink');
const createLink = document.getElementById('createLink');

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