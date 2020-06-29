document.addEventListener("DOMContentLoaded", function(e){



    // function putUpForm (){
        const  monsterFormContainer = document.getElementById("create-monster")
        const form = document.createElement('form')
        form.id = "monster-form"
        form.innerHTML = 
            `<input id="name" placeholder= "name...">
            <input id="age" placeholder= "age...">
            <input id="description" placeholder= "description...">
            <button>Create</button>`
        monsterFormContainer.append(form)
    // }
    // putUpForm()


    function renderMonster(monsterObject){
        const monsterContainer = document.getElementById("monster-container")
        const monsterDiv = document.createElement('div')
        monsterDiv.className = "individual-monster"
        monsterDiv.id = `${monsterObject.id}`
        monsterDiv.innerHTML = 
                `<h2>${monsterObject.name}</h2>
                <h4> Age: ${monsterObject.age}</h4>
                <p> Bio: ${monsterObject.description}</p>`
        monsterContainer.append(monsterDiv)
    }

    function renderMonsters(manyMonstersObjects){
        manyMonstersObjects.forEach(monsterObject => {
            renderMonster(monsterObject)
        })
    }

    function fetchMonsters(url){
        fetch(url)
        .then(resp => resp.json())
        .then(monstersData => renderMonsters(monstersData))
    }
    fetchMonsters("http://localhost:3000/monsters/?_limit=50&_page=1")



    function postMonster(url, newMonsterObject){
        fetch(url, {
            method: "POST",
            headers: 
            {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({
                "name": `${newMonsterObject.name}`,
                "age": `${newMonsterObject.age}`,
                "description": `${newMonsterObject.description}`
            })
        })
        .then(resp => resp.json())
        .then(monster => renderMonster(monster))
    }

    const monsterForm = document.getElementById("monster-form")
    monsterForm.addEventListener("submit", function(e){
        e.preventDefault()

        const newMonster = {
            name: e.target.getElementsByTagName("input")[0].value,
            age: e.target.getElementsByTagName("input")[1].value,
            description: e.target.getElementsByTagName("input")[2].value
        }

        postMonster("http://localhost:3000/monsters", newMonster)
        form.reset()
    })

    let pageCounter = 1
    document.addEventListener("click",function(e){
        if (e.target.id === "forward"){
            pageCounter += 1
            const allFiftyMonsters = document.getElementById("monster-container").children
            let arrayOfCurrentFifty = Array.prototype.slice.call( allFiftyMonsters )
            arrayOfCurrentFifty.forEach(monster => {monster.remove()})
            fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
        }

        else if (e.target.id === "back"){
            if (pageCounter>1) {
                pageCounter -= 1
                const allFiftyMonsters = document.getElementById("monster-container").children
                let arrayOfCurrentFifty = Array.prototype.slice.call( allFiftyMonsters )
                arrayOfCurrentFifty.forEach(monster => {monster.remove()})
                fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
            }
        }
    })


})