document.addEventListener('DOMContentLoaded', () =>{
    let currentPage = 1
    const monsterCont = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')
    let monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'
    
    document.addEventListener('click', (e)=>{
        if (e.target.id === 'forward'){
            currentPage += 1
            getMonsters(currentPage)
        } else if (e.target.id ==='back'){
            currentPage -=1
            getMonsters(currentPage)
        }
    })

    function postMonster(){
        monsterForm.addEventListener('submit', (e)=>{
            e.preventDefault()
    
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: monsterForm.name.value,
                    age: monsterForm.age.value,
                    description: monsterForm.description.value
                })
            })
            .then(resp => resp.json())
            .then(monster => {render(monster)
                // let newMonster = render(monster)
                // monsterCont.prepend(newMonster)
            }) 
            monsterForm.reset()
        })
    }

    function getMonsters(){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(monsters => {monsters.forEach(function(monster){
            render(monster)
        })
        })
    }

    function render(monster){
        const monsterDiv = document.createElement('div')
        monsterDiv.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
       monsterCont.append(monsterDiv)
    }

    function newForm(){
        monsterForm.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>
        `
        createMonster.append(monsterForm)
    }

    getMonsters()
    newForm()
    postMonster()
})



