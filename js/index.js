

document.addEventListener("DOMContentLoaded", () => {
// waits for an interaction to occur, 
// once triggered, executes the following: 

    getMonsters();

})

document.addEventListener("submit", function(e) {
// e.preventDefault() allows a user to successfully create a new monster w/o page reload (after clicking the form 'submit' button called, 'Create')
    
    e.preventDefault();

    createMonster();

})

function getMonsters() {
// fetches all the monsters data from the server, 
// this collection is stored as an array, 
// the two chain functions (then()'s) deal with the response data 
// 'collection of all monsters' --> 'each monster' (js objects / JSON)

    fetch("http://localhost:3000/monsters") 
        .then(response => response.json())
        .then(monstersCollection => {
            monstersCollection.forEach(function(monster) {
                render(monster)
            })
        })
}

function render(monster) {
// turns response data into what end-users see on their screen
// Q1. Where should each monster appear on the screen? 
    // monsterContainerDiv
// Q2. How should the data for each monster be presented? (HTML / structure)
    // monsterDiv.innerHTML
// this function renders data via appending each monsterDiv to the monsterContainerDiv

    const monsterContainerDiv       = document.getElementById('monster-container')
    const monsterDiv                = document.createElement('div') 
    monsterDiv.className            = "monsterData"
    monsterDiv.innerHTML            = `
                                        <h2>${monster.name}</h2>
                                        <p>Age: ${monster.age}</p>
                                        <p>Description: ${monster.description}</p>
                                        <p>Id: ${monster.id}</p>
                                    `
    monsterContainerDiv.append(monsterDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    // the event handler waits for an interaction to occur, 
    // once triggered, executes the following: 
    
        getMonsters()
    
    })


function createMonster() {
// 

    const newForm                   = document.createElement('form')
    newForm.id                      = "monster-form"
    const newMonsterFormContainer   = querySelector('#create-monster')
    newMonsterFormContainer.innerHTML = '
                                        <
                                    '





}