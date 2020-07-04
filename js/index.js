document.addEventListener("DOMContentLoaded", () => {

// GET

    function renderOneMonster(monster){

        const monsterContainer = document.getElementById('monster-container')
        
        const monsterDiv = document.createElement('div')
        monsterDiv.id = monster.id
        monsterDiv.innerHTML = `
                                    <p>Name: ${monster.name}</p>
                                    <p>Age: ${monster.age}</p>
                                    <p>Description: ${monster.description}</p>
        `

        monsterContainer.append(monsterDiv)
    } 

    function renderAllMonsters(monsters){
        monsters.forEach(monster => renderOneMonster(monster))
    }

    function fetchAllMonstersData(url){
        fetch(url)
        .then(resp => resp.json())
        .then(allMonstersDataObjects => renderAllMonsters(allMonstersDataObjects))
    }
    fetchAllMonstersData("http://localhost:3000/monsters/?_limit=50")

// Create Form 

    function createNewMonsterForm(){

        const formContainer = document.getElementById('create-monster')

        const form = document.createElement('form')
        form.id = "monster-form"
        form.innerHTML = `
                            <input id="name" placeholder="Your Monster's Name">
                            <input id="age" placeholder="Your Monster's Age">
                            <input id="description" placeholder="Description">  
                            <button>Create</button>
        `

        formContainer.append(form)
    }
    createNewMonsterForm()

// POST Form's User Input 

        // Step 5. 
        function postNewMonster(url, newMonsterObject){
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newMonsterObject)
            })
            .then(resp => resp.json())
            .then(newMonsterDataObject => renderOneMonster(newMonsterDataObject))
        }

    // Step 1. 
        const monsterForm = document.getElementById('monster-form')

    // Step 2. 
        monsterForm.addEventListener("submit", function(e){

    // Step 3.  
            e.preventDefault()

    // Step 4. 
            const newMonster = {
                name: e.target.querySelector("#name").value,
                age: e.target.querySelector("#age").value,
                description: e.target.querySelector("#description").value
            }

    // Step 6. 
        postNewMonster("http://localhost:3000/monsters", newMonster)
        monsterForm.reset()

    })

})

// 