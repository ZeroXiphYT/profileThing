const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const orderInp = document.getElementById('orderNumber');
const makeBtn = document.getElementById('makeUserBtn');
const createSpan = document.getElementById('userCreateSpan');

makeBtn.addEventListener('click', async function () {
    if (fNameInp.value.trim().length === 0 || lNameInp.value.trim().length === 0 || orderInp.value.trim().length === 0) {
        var h1 = document.createElement('h1');
        h1.style.color = 'maroon';
        h1.innerHTML = `Enter actual values into the input boxes`;
        createSpan.appendChild(h1);
        return;
    };
    var data = { fName: fNameInp.value.toLowerCase(), lName: lNameInp.value.toLowerCase(), orderNum: orderInp.value };
    console.log(data);
    var response = await fetch('/createPerson', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    var data = await response.json();
    console.log(data);
    const { fName, lName, orderCount, userId } = data;
    var h1 = document.createElement('h1');
    h1.style.color = 'black';
    h1.innerHTML = `The User <span style="color: red;">${fName} ${lName}</span> has been created with the order count of <span style="color: red;">${orderCount}</span>, VERY IMPORTANT: USER ID = <span style="color: red;">${userId}</span> DO NOT FORGET IT, you will need it to access everything`;
    createSpan.innerHTML = "";
    createSpan.appendChild(h1);

});
