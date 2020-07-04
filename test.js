document.addEventListener("DOMContentLoaded", () => {
    // waits for an interaction to occur, 
    // once triggered, executes the following: 
    
        getMonsters("http://localhost:3000/monsters")
        createMonster("http://localhost:3000/monsters", newMonster)
    
    })
    
    function getMonsters(url) {
    // fetches all the monsters data as a collection from the server, 
    // the two chain functions (then()'s) deal with the response data 
    // 'collection of all monsters' --> 'each monster' 
    
        fetch("http://localhost:3000/monsters") 
            .then(response => response.json())
            .then(monstersCollection => {
                monstersCollection.forEach(function(monster) {
                    render(monster)
                })   
            })
            getMonsters("http://localhost:3000/monsters")
    
        
        
    }
    
    function render(monsterObj) {
    // turns response data into what end-users see on their browser
    // Q1. Where should each monster appear on the screen? 
        // monsterContainerDiv
    // Q2. How should the data for each monster be presented? (HTML / structure)
        // monsterDiv.innerHTML
    // this function renders data by appending each monsterDiv to the monsterContainerDiv
    
        const monsterContainerDiv = document.getElementById('monster-container')
        const monsterDiv = document.createElement('div') 
        
        monsterDiv.className = "monsterData"
        monsterDiv.innerHTML = `
                                    <h2>${monsterObj.name}</h2>
                                    <p>Age: ${monsterObj.age}</p>
                                    <p>Description: ${monsterObj.description}</p>
                                    <p>Id: ${monsterObj.id}</p>
                                `
        monsterContainerDiv.append(monsterDiv);
    }
    
    function createMonster(url, createdMonster) {
    // creates a new form with input fields for name, age, and description
    // also creates a 'submit' button that triggers newCreatedMonster to be posted on the monster's list as well as saved in the API  
    
        const formContainer = document.getElementById('create-monster')
        const form = document.createElement('form')
        
        form.id = 'monster-form'
        form.innerHTML =        `
                                    <input id="name" placeholder="name...">
                                    <input id="age" placeholder="age...">
                                    <input id="description placeholder="description...">
                                    <button>Create</button>
                                `
        formContainer.append(form)
    
        const submitButton = document.querySelector('form')[3]
        submitButton.addEventListener("submit", function(e) {
            e.preventDefault()
    
            if (e.target.textContent === "Create")
                fetch("http://localhost:3000/monsters"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        "name": `${createdMonster.name}`,
                        "age": `${createdMonster.age}`,
                        "description": `${createdMonster.description}`
                    })
                }
                    .then(response => response.json())
                    .then(newMonsterObject => render(newMonsterObject))
    
            const newMonster = {
                name: e.target.getElementByTagName('form')[0].value, 
                age: document.querySelector('form')[1].value,
                description: document.querySelector('form')[2].value 
            }
    
            createMonster("http://localhost:3000/monsters", newMonster)
            // new monster is saved in the API
            form.reset()    
        }) 
    
    }