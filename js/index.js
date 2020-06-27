let currentPage = 1

document.addEventListener("DOMContentLoaded", function(){
  
    function fetchMonsters(currentPage){
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(monsterObj => {
                makeMonster(monsterObj)
            })
        })
    }  

    function makeMonster(monsterObj){
        const monsterContainer = document.querySelector('#monster-container')
        const monster = document.createElement('div')
        monster.innerHTML = `
          <h2>${monsterObj.name}</h2>
          <h3>Age: ${monsterObj.age}</h3>
          <p>${monsterObj.description}</p>
        `
        monsterContainer.append(monster)
    }

    document.addEventListener('click', function(e){
        e.preventDefault()
        if (e.target.id === 'submit'){
            let monsterForm = document.getElementById('create-monster')
            let name = document.getElementById('name').value
            let age = document.getElementById('age').value
            let description = document.getElementById('description').value

            fetch("http://localhost:3000/monsters",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    description: description
                })
            })
            .then(response => response.json())
            .then(monsterObj => {
                makeMonster(monsterObj)
            })
        }
    })

    document.addEventListener('click', function(e){
      if(e.target.id === 'forward'){
        currentPage = currentPage + 1
        fetchMonsters(currentPage)
        console.log(currentPage)
      }
    })



    fetchMonsters()

})