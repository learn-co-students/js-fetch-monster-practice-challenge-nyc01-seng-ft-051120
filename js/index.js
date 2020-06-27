let monstersUrl = "http://localhost:3000/monsters"

let currentPage = 1
function fetchMonsters(currentPage) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(monster => {
            renderMonster(monster)
        })
    }) 
}


document.addEventListener("DOMContentLoaded", function(e) {
    fetchMonsters(1)
    monsterForm()
    submitMonster()
    moreMonsters()
})


function renderMonster(monster) {
    let monsterDiv = document.createElement("div")
    monsterDiv.id = `${monster.id}`
    monsterDiv.innerHTML = `
    <h2>${monster.name}</h2
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>`
    let monsterContainer = document.querySelector("#monster-container")
    monsterContainer.append(monsterDiv)
}

function monsterForm() {
    const createMonsterContainer = document.querySelector("#create-monster")
    let monsterForm = document.createElement("form")
    monsterForm.id = "monster-form"
    monsterForm.innerHTML = `
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button id="submit">Create</button>
    `
    createMonsterContainer.append(monsterForm)
}

let form = document.querySelector("#monster-form")
function submitMonster() {
    document.addEventListener("submit", function(e) {
            e.preventDefault()
            
            let monsterForm = document.getElementById("create-monster")
            let name = document.getElementById("name").value
            let age = document.getElementById("age").value
            let description = document.getElementById("description").value
            document.querySelector("#monster-form").reset()


            //fetch request
            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }, body: JSON.stringify({
                    name: name,
                    age: age,
                    description: description
                })
            }
            fetch(monstersUrl, configObj)
            .then(response => response.json())
            .then(monsterObj => {
                console.log(monsterObj)
                renderMonster(monsterObj)
            })
            .catch((error) => {
                console.error("error", error)
            })
        })
}

function moreMonsters() {
    document.addEventListener("click", function(e) {
        if (e.target.id === "forward") {
            currentPage += 1
            fetchMonsters(currentPage)
            console.log(currentPage)
        }
    })
}

function createNewMonster(monsterObj) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }, body: JSON.stringify({monsterObj})
    }
    fetch(monstersUrl, configObj)
    .then(response => response.json())
    .then(monster => {
        console.log(monster)
    })
    .catch((error) => {
        console.error("error", error)
    })
}


