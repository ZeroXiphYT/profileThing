const fNameInp = document.getElementById('fName');
const lNameInp = document.getElementById('lName');
const userIdInp = document.getElementById('userId');
const seeOrderBtn = document.getElementById('seeOrderBtn');
const tbody = document.getElementById('tbody');

seeOrderBtn.addEventListener('click', async function () {
    const data = { fName: fNameInp.value.toLowerCase(), lName: lNameInp.value.toLowerCase(), userId: userIdInp.value };
    if (fNameInp.value.trim().length === 0 || lNameInp.value.trim().length === 0 || userIdInp.value.trim().length === 0) {
        const h1 = document.createElement('h1');
        h1.style.color = 'maroon';
        h1.innerHTML = 'Enter the name and user id';
        document.getElementById('status').innerHTML = "";
        document.getElementById('status').appendChild(h1);
        return;
    }
    const response = await fetch('/seeOrdersOfUser', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const resultData = await response.json();
    document.getElementById('status').innerHTML = "";
    const h1 = document.createElement('h1');
    h1.style.color = "black";
    h1.innerHTML = "success, press see orders again to refresh the table";
    document.getElementById('status').appendChild(h1);
    console.log(resultData);
    refreshTable(resultData.orders);
});

function refreshTable(data) {
    tbody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const newRow = document.createElement("tr");
        for (var key in data[i]) {
            var dataVal = data[i][key];

            const br = document.createElement('br');
            var newData = document.createElement("td");

            newData.textContent = `${dataVal}`;
            newRow.append(newData);
            tbody.appendChild(newRow);

        }
    }
}