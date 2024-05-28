document.getElementById('deleteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;

    await fetch('http://localhost:3030/pug/' + userId, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(resp => {resp.json()
        const div = document.getElementById('group')
        const link = document.createElement("a")
        link.href = "/pug"
        link.innerText = "Home Page"
        div.append(link)
    })
})
