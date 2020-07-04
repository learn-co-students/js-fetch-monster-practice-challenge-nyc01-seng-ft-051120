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
        form.reset()
    
    })