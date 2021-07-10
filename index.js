async function getData (){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (response.ok) {
        return response.json()
    }
}

function fillData  ()  {
    getData().then(data => {
        console.log(data)
        data.forEach(posts => {
            const tbody = document.getElementById('tbody')
            const tr = document.createElement('tr')
            const num = document.createElement('td')
            const title = document.createElement('td')
            const body = document.createElement('td')
            const comment = document.createElement('td')
            tr.append(num, title, body, comment)
            tbody.append(tr)
            num. innerText = posts.id
            title.innerText = posts.title
            body.innerText = posts.body
            comment.innerHTML = `<div class="showButton" onclick="openModal()"><p>Посмотреть</p></div>`
            comment.addEventListener('click', () => {
                checkComment(posts.id)
            })
        })
    })
}
async function checkComment(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        data.forEach(com => {

            const tbody1 = document.getElementById('tbody1')
            const tr1 = document.createElement('tr')
            const name = document.createElement('td')
            const email = document.createElement('td')
            const body1 = document.createElement('td')

            tr1.append(name, email, body1)
            tbody1.append(tr1)
            name. innerText = com.name
            email.innerText = com.email
            body1.innerText = com.body
        })
    })
}


fillData()


const closeModal = () => {
    document.getElementById('myModal').style.display = 'none'
    const table = document.getElementById('tbody1')
    while(table.rows.length > 0) {
        table.deleteRow(0);
    }
}


document.querySelector('.close').addEventListener('click', () => {
    closeModal()
})


const openModal = () => {
    document.getElementById('myModal').style.display = 'block'
}
