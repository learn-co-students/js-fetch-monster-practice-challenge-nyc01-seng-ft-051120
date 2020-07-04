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