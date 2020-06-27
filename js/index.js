document.addEventListener('DOMContentLoaded',()=>{
  limit = 5
  const MonData = () =>{ fetch(`http://localhost:3000/monsters/?_limit=${limit}`)
    .then (resp =>resp.json())
    .then (json =>{json.forEach(monster => showMonsters(monster))})
    }
   console.log("heloooooo")
  function showMonsters(monster) {
    const divMon = document.getElementById('monster-collection')
    let newDiv = document.createElement("div")
    newDiv.dataset.id = monster.id
    newDiv.innerHTML=`<h2>${monster.name}</h2>
    <h6>${monster.age}</h6>
    <p>${monster.description}</p>
    `
    divMon.append(newDiv)
  }
  const monsterSubmit = () =>{
    document.addEventListener('submit',e =>{
      const monsterForm = e.target
      const name = monsterForm.name.value
      const age = monsterForm.age.value
      const description = monsterForm.description.value
      const obj = {
        name: name,
        age: age,
        description : description
      }
      fetch('http://localhost:3000/monsters' ,{
        method: "POST",
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify(obj),
      })
      .then(response =>response.json())
      .then(obj =>{ console.log('Success:', obj);
    })
      .catch((error) => {
        console.error('Error:', error);
      })
      
      monsterForm.reset()
    })
  }
  function moreItems(){
    let buttonNext = document.getElementById('forward')
    let buttonBack = document.getElementById('back')
    document.addEventListener('click',function(e){
      if (e.target == buttonNext){
        fetch(`http://localhost:3000/monsters/?_limit=${limit = limit +50}`)
        .then (resp =>resp.json())
        .then (json =>{json.forEach(monster => showMonsters(monster))}) 
      }
      else if(e.target == buttonBack){
        fetch(`http://localhost:3000/monsters/?_limit=${limit -50}`)
        .then (resp =>resp.json())
        .then (json =>{json.forEach(monster => showMonsters(monster))}) 
      } 
    })
  }
 
  MonData()
 monsterSubmit()
 moreItems()
})






