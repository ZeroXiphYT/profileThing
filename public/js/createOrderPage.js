const spicySel = document.getElementById('spiciness');
const foodSel = document.getElementById('food');
const sauceSel = document.getElementById('sauce');
const topping1Sel = document.getElementById('topping1');
const topping2Sel = document.getElementById('topping2');
const topping3Sel = document.getElementById('topping3');
const orderBtn = document.getElementById('orderFoodBtn');
const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const userIdInp = document.getElementById('userId');
const orderSuccessSpan = document.getElementById('orderSuccessSpan');

orderBtn.addEventListener('click', async function () {
    const data = { spicyLev: spicySel.value, food: foodSel.value, sauce: sauceSel.value, topping1: topping1Sel.value, topping2: topping2Sel.value, topping3: topping3Sel.value, firstName: fNameInp.value.toLowerCase(), lastName: lNameInp.value.toLowerCase(), userId: userIdInp.value };
    if (fNameInp.value.trim().length === 0 || lNameInp.value.trim().length === 0 || userIdInp.value.trim().length === 0) {
        Swal.fire('Enter your first name, last name and user id, or you will not be able to order food');
        return;
    } else {
        Swal.fire({
            title: 'Is this your order?',
            text: `Is ${data.food} your item, spiciness: ${data.spicyLev}, is your sauce: ${data.sauce}, is ${data.topping1} your first topping, is ${data.topping2} your second topping and is ${data.topping1} your third topping, your full order?`,
            showDenyButton: true,
            confirmButtonText: 'Yes!',
            denyButtonText: 'Go back'
        })
            .then(async result => {
                if (result.isConfirmed) {
                    const response = await fetch('/order', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    const resultData = await response.json();
                    console.log(resultData);
                    if (resultData.userFound === 'User does not exist') {
                        Swal.fire('This user does not exist, check the spelling or your user id');
                        const h1 = document.createElement('h1');
                        h1.style.color = 'maroon';
                        h1.innerHTML = `The order was not successful :(`;
                        orderSuccessSpan.innerHTML = "";
                        orderSuccessSpan.appendChild(h1);
                        return;
                    } else if (resultData.success === true) {
                        const h1 = document.createElement('h1');
                        h1.style.color = 'black';
                        h1.innerHTML = `The order was a success!!! 😁`;
                        orderSuccessSpan.innerHTML = "";
                        orderSuccessSpan.appendChild(h1);
                    }
                } else if (result.isDenied) {
                    Swal.fire('ok, make changes to your order and then order again!');
                }
            });
    }
});