const baseUrl= 'http://localhost:3000/monsters'
let ids=0
const monsterContainer=document.querySelector('#monster-container')
const createDiv=document.querySelector('#create-monster')
document.addEventListener('DOMContentLoaded', e=>{
    
const createForm=document.createElement('form')
createForm.id='create-monster-form'
createForm.innerHTML=`<input name='name' type='text' placeholder='Name Please'></input>
                      <input name='age' type='number'  placeholder='Age Here'></input>
                      <input name='description' type='text' placeholder='Describe The Monster'></input>
                      <button id='create-btn' type='submit'>Create</button>`
createDiv.appendChild(createForm)

function createMonster(){
 let monsterObj={
            "name": createForm.name.value,
            "age": createForm.age.value,
            "description": createForm.description.value
        
  }
  console.log(monsterObj)

  fetch(baseUrl, {
    method: "POST",
    headers: {"Content-type": "application/json",
              "Accept": "application/json"
              },
      body: JSON.stringify(monsterObj)
            })

  .then(resp =>resp.json())
  .then(createdMonster =>{
      console.log("success!", createdMonster)
      renderMonster(createdMonster)
  })
  .catch(error=>{
    console.log(error.message)
  })
}

    getMonster()
    document.addEventListener('click', e=>{
        switch(e.target.id){
            case 'back': back()
            cleanDom()
            break;
            case 'forward': forward()
            cleanDom()
            break;
            case 'create-btn': e.preventDefault()
            createMonster()
            createForm.reset()
            break;

        }

    })
})
const cleanDom=()=>{
    while(monsterContainer.firstChild){
        monsterContainer.removeChild(monsterContainer.firstChild)
    }
}


const forward=()=>{
    getMonster()
}
const back=()=>{
    if (ids-100>=0){
        ids -=100
    }
    else{ ids=0}

    getMonster()
}

const getMonster=()=>{
    fetch(baseUrl)
    .then(res=>res.json())
    .then(monsters=>{
    
            for(let i=0; i<50; i++){
                renderMonster(monsters[ids])
                ids++
            }     
    })
}

const renderMonster=monster=>{
    
    
    let newDiv=document.createElement('div')
    newDiv.id=monster.id
    newDiv.innerHTML=`<h2>Name: ${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>`
    monsterContainer.appendChild(newDiv)
}