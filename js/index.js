document.addEventListener("DOMContentLoaded", function (e){

  createForm()
  fetchMonsters()
  createMonster()

  let newMonster = document.querySelector("#create-monster > form")
  newMonster.addEventListener('submit', (e) => {
    e.preventDefault()
    createMonster(e.target)
  })
})

function fetchMonsters(){
  fetch("http://localhost:3000/monsters")
  .then(resp => resp.json())
  .then(monsters => renderMonsters(monsters))
}

function renderMonsters(monsters){
  const container = document.getElementById('monster-container')
  monsters.forEach(monster => {
    let monsterLi = document.createElement("li")
    monsterLi.id = monster.id
    monsterLi.innerHTML = `
    <h2 name="name">${monster.name}</h2>
    <h3 name="breed">${monster.age}</h3>
    <h3 name="sex">${monster.description}</h3>
    `
    container.append(monsterLi)
  })
}

function createForm(){
  let create = document.getElementById('create-monster')
  let form = document.createElement('form')
  form.innerHTML = `
            <input type="text" name="name" placeholder="name" value="" />
            <input type="number" name="age" placeholder="age" value="" />
            <input type="text" name="description" placeholder="description" value="" />
            <input type="submit" value="Create Monster" />
  `
  create.append(form)
}

function createMonster(){
  let newMonster = document.querySelector("#create-monster > form")
  let monsterObj = {
  name: newMonster.name.value,
  age: newMonster.age.value,
  description: newMonster.description.value
  }
  console.log(monsterObj);
  

  fetch(`http://localhost:3000/monsters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }, 
    body: JSON.stringify(monsterObj)
  })
  newMonster.reset()
}