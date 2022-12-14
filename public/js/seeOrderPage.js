const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const userIdInp = document.getElementById('userId');
const seeOrderBtn = document.getElementById('seeOrders');
const orderSpan = document.getElementById('orderCountSpan');

seeOrderBtn.addEventListener('click', async function () {
    var data = { fName: fNameInp.value, lName: lNameInp.value, userId: userIdInp.value };
    console.log(data);
    var response = await fetch('/viewOrderCount', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    var data = await response.json();
    console.log(data);
    if (data.ordercount && data.firstName && data.lastName && data.userId) {
        var { ordercount, firstName, lastName, userId } = data;
        var fullName = firstName + " " + lastName;
        orderSpan.innerHTML = "";
        var h1 = document.createElement('h1');
        h1.style.color = 'black';
        h1.innerHTML = `${fullName}(user ${userId}) has ${ordercount} orders`;
        orderSpan.appendChild(h1);
    } else if (data.userFound) {
        orderSpan.innerHTML = "";
        var h1 = document.createElement('h1');
        h1.style.color = 'red';
        h1.innerHTML = `The user with the id you entered does not exist`;
        orderSpan.appendChild(h1);
    }



});