document.addEventListener("DOMContentLoaded", () => {
const monsterFwd = document.querySelector("#forward")
const monsterBwd = document.querySelector("#back")
let currentPage = 1
const baseUrl = 'http://localhost:3000/monsters'
// √need to get monsters    
    // √need to send a fetch to the url
    // √need to pass the data into an object
    // √need to find the container for data
    // √need to append data to container 
    const monsterDiv = document.querySelector("#monster-container")
    const getMonsters = () => {
        fetch(baseUrl+`?_limit=50&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(monsters => {
            for (i = 0; i < monsters.length; i++){
                const monsterCard = document.createElement("div")
                monsterCard.dataset.number = `${monsters[i].id}`
                monsterCard.innerHTML = `
                <h2>${monsters[i].name}</h2>
                <h4>Age: ${monsters[i].age}</h4>
                <p>Bio: ${monsters[i].description}</p>
                `
            monsterDiv.append(monsterCard)
            }
     
        })
    
    }

    const createMonsterCard = (monster) => {
        const newMonsterCard = document.createElement("div")
        newMonsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.bio}</p>
        `
        monsterDiv.prepend(newMonsterCard)
    }



    // √need to find area to create monster
        // √need to create form
        // √need to add event listener for submit to post data 
    const showMonsterForm = () => {
        const monsterFormParent = document.querySelector("#create-monster")
        const monsterForm = document.createElement("form")
        monsterForm.innerHTML = `
        <label>Name: </label>
        <input type="text" name="name" placeholder="monster">
        <br>
        <label>Age: </label>
        <input type="number" name="age" placeholder="age">
        <br>
        <label>Bio:</label>
        <input type="text" name="bio" placeholder="bio">
        <br>
        <input type="submit" name="submit" value="RAWR">
        `
        monsterFormParent.append(monsterForm)
        
    }

    // should render the page with the next 50 monsters
        // need to use page number to increment everything 
        // need to refresh page 

    const pageListener = () => {
        document.addEventListener("click", e=>{
            if (e.target === monsterFwd){
                
                let newPage = currentPage+1
                fetch(baseUrl+`?_limit=50&_page=${newPage}`)
                .then(resp => resp.json())
                .then(monsters => {
                    for (i = 0; i < monsters.length; i++){
                        const monsterCard = document.createElement("div")
                        monsterCard.dataset.number = `${monsters[i].id}`
                        monsterCard.innerHTML = `
                        <h2>${monsters[i].name}</h2>
                        <h4>Age: ${monsters[i].age}</h4>
                        <p>Bio: ${monsters[i].description}</p>
                        `
                    monsterDiv.append(monsterCard)
                    }
                })
               
            }
        })

    }


    const submitHandler = () => {
        const submitButton = document.querySelector("#submit")
        document.addEventListener("submit", e => {
            e.preventDefault()
            const form = e.target

            const name = form.name.value
            const age = form.age.value
            const bio = form.bio.value

            const monsterObj = {
                name: name,
                age: age,
                bio: bio
            }

            form.reset()

            fetch(baseUrl,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "applicaiton/json"
                },
                body: JSON.stringify(monsterObj)
            })
            .then(resp => resp.json())
            .then(monster => createMonsterCard(monster))
        })
    }
submitHandler()
showMonsterForm()
getMonsters()
pageListener()
})