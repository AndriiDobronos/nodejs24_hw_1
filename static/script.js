const API_URL_BASE = 'http://localhost:3030';

async function getUsersList() {
    return await fetch(API_URL_BASE + '/users').then((r) => r.json());
}

function drawTableWithContent(userData) {
    const usersTable = document.createElement('table');
    usersTable.classList.add('mainTable');

    const head = document.createElement('thead');
    const headersRow = document.createElement('tr');
    ['ID', 'Username', 'Email', 'Employee'].forEach((name) => {
        const cell = document.createElement('th');
        cell.innerText = name;
        cell.classList.add(name.toLowerCase());
        headersRow.appendChild(cell);
    })
    head.appendChild(headersRow);

    const body = document.createElement('tbody');
    userData.forEach((d) => {
        const row = makeDataRow(d);
        body.appendChild(row);
    })

    usersTable.append(head, body)

    return usersTable;
}

function makeDataRow(userData) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.innerText = userData.id;

    const titleCell = document.createElement('td');
    titleCell.innerText = userData.username;

    ['id', 'username', 'email', 'employee'].forEach((name) => {
        const cell = document.createElement('td');
        cell.innerText = userData[name];
        row.appendChild(cell);
    })

    return row;
}
// makeDataRow({ id: 1, username: 'John Smite', email: 'JohnSmite@mail.com', employee: 1 })

async function init() {
    const usersData = await getUsersList();
    const table = drawTableWithContent(usersData);

    document.getElementById('root').appendChild(table);
}

init().then();