
  //GLOBAL VARIABLES
const baseUrl = 'http://localhost:3000/monsters'
let limit = 50

const create = document.getElementById('create-monster')
const formTemplate = document.createElement('form')
formTemplate.setAttribute("id", "monster-form")
formTemplate.innerHTML = `
<input id="name" placeholder="name">
<input id="age" placeholder="age">
<input id="description" placeholder="description">
<button id="create">Create</button>
`
create.appendChild(formTemplate)

const createButton = document.getElementById('create')
const forwardButton = document.getElementById('forward')

//FETCH & RENDER MONSTERS ON PAGE

const fetchMonsters = () => {
fetch(`${baseUrl}/?_limit=${limit}`)
.then(response => response.json())
.then(json => json.forEach(monster => render(monster)))
}

function render(monst) {
  const monsterList = document.getElementById('monster-container')
  const monsterDiv = document.createElement('div')
  monsterDiv.dataset.id = monst.id
  monsterDiv.innerHTML = `
  <h2>${monst.name}</h2>
  <h4>age: ${monst.age}</h4>
  <p>Bio: ${monst.description}</p>`
  monsterList.appendChild(monsterDiv)
}

//CREATE NEW MONSTER
const postMonster = () => {

  document.addEventListener('submit', e => {
   e.preventDefault()
  
  const form = e.target

  const name = form.name.value
  const age = form.age.value
  const description = form.description.value

  const monsterObj = {
   name: name,
   age: age,
   description: description,
 }
   fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(monsterObj),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    }
    })
    .then(response => response.json())
    .then(json => console.log('Success', json))
    .catch(error => console.alert(error))
   }
 )}
  
  function moreMonsters(){
    let buttonNext = document.getElementById('forward')
    let buttonBack = document.getElementById('back')
    document.addEventListener('click',function(e){
      if (e.target == buttonNext){
        fetch(`${baseUrl}/?_limit=${limit + 50}`)
        .then (resp =>resp.json())
        .then (json =>{json.forEach(monster => render(monster))}) 
      }
    })
  }

  fetchMonsters()
  postMonster()
  moreMonsters()


