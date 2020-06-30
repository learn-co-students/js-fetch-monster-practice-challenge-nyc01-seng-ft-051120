

document.addEventListener("DOMContentLoaded", () => {
// the event handler waits for an interaction to occur, 
// once triggered, executes the following: 

    getMonsters()

})

function getMonsters() {
// this function fetches all the monsters data from the database, 
// the data is stored as an array, 
// in order to show individual monsters, we attach '.forEach(function(monster)' (like Ruby's .each do |monster|) 

    fetch("http://localhost:3000/monsters") 
        .then(response => response.json())
        .then(monstersArray => {
            monstersArray.forEach(function(monster) {
                render(monster)
            })
        })
}

function render(monster) {
// 

    const monsterContainerDiv = document.getElementById('monster-container')
    const monsterDiv = document.createElement('div') 
    monsterDiv.className =      "monsterData"
    monsterDiv.innerHTML =      `
                                <h2>${monster.name}</h2>
                                <p>Age: ${monster.age}</p>
                                <p>Description: ${monster.description}</p>
                                <p>Id: ${monster.id}</p>
                                `
    monsterContainerDiv.append(monsterDiv);
}