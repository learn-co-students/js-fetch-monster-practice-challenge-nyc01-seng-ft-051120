document.addEventListener("DOMContentLoaded", () => {



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



// ALL THIS TAKES CARE OF FETCHING ALL MONSTERS FROM DATABASE/API AND RENDERING ALL MONSTERS TO DOM (ON PAGE)
    //this function takes in an argument of a single object, and renders it (creates the DOM node/innerHTML for that object, including whichever values you want to take from the databaseand )
    function renderMonster(monsterObject){
        const monsterContainer = document.getElementById("monster-container")//we found and defined the variable for the container to which we will append this new div after we create it
        const monsterDiv = document.createElement('div') //create a div for the monster
        monsterDiv.className = "individual-monster" //did not end up needing/using this
        monsterDiv.id = monsterObject.id //interpolation not necessary because it is not a string we're rendering to page, rather a value for the id attribute in the tag itself
        monsterDiv.innerHTML = //we created the monsterDiv already, we just stick in some more elements/tags nested into it as it's innerHTML
                `<h2>${monsterObject.name}</h2>
                <h4> Age: ${monsterObject.age}</h4> 
                <p> Bio: ${monsterObject.description}</p>` //remember interpolation!
        monsterContainer.append(monsterDiv) //we already defined our monsterContainer, we just need to append the new monster div to that container
    }

    //this function takes in an object that is a collection of objects, and iterates through that object of many objects, passing each object into the "renderMonster" (singular) function
    function renderMonsters(manyMonstersObjects){
        manyMonstersObjects.forEach(monsterObject => {
            renderMonster(monsterObject)
        })
    }

    //this function takes in argument of a url and does a default fetch GET request to that url
    function fetchMonsters(url){
        fetch(url)
        .then(resp => resp.json()) //converts kooky data into json
        .then(monstersObjects => renderMonsters(monstersObjects)) //turns json object into nice javascript object (here, an array of many objects actually), which we pass as an argument to our "renderMonsters" function (that function in turn will iterate through the objects array and pass each object into the "renderMonster" (singular) function.
    }
    fetchMonsters("http://localhost:3000/monsters/?_limit=50&_page=1") //calling our fetchMonsters function  with an argument of a url (this url happens to have special "limitations" tagged on to filter results-first page of 50)

// ALL THIS TAKES CARE OF FETCHING ALL MONSTERS FROM DATABASE/API AND RENDERING ALL MONSTERS TO DOM (ON PAGE)
    

    //this function takes in a url and a new monster object (that is like a hash), it only renders that object (in the second .then) using our renderMonster function once the object has been successfully sent to the database/api (it is actually rendering the object from the database itself)
    function postMonster(url, newMonsterObject){
        fetch(url, {
            method: "POST",
            headers: 
            {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(newMonsterObject)
        })
        .then(resp => resp.json())
        .then(monsterThatWasAdded => renderMonster(monsterThatWasAdded))
    }


    const monsterForm = document.getElementById("monster-form") // define and find variable for monster form
    monsterForm.addEventListener("submit", function(e){ //listen for a "submit" event
        e.preventDefault() //prevent the default action of a submit (a post/patch etc request that reloads the page)

        //create a new object variable, capture the text values in the input fields of the form and save them as the values for that new object's keys
        const newMonster = {
            name: e.target.querySelector("#name").value,
            age: e.target.querySelector("#age").value,
            description: e.target.querySelector("#description").value
        }
        
        postMonster("http://localhost:3000/monsters", newMonster)
        form.reset()
    })





//COMPLICATED SHIT THAT TAKES CARE OF REMOVING THE CURRENT 50 MONSTERS ON PAGE AND DISPLAYING NEXT/PREVIOUS 50 WHEN USER CLICKS FORWARD OR BACKWARDS BUTTONS- (LISTENS FOR CLICKS)
    let pageCounter = 1
    document.addEventListener("click",function(e){
        if (e.target.id === "forward"){
            pageCounter += 1            
            // .children
            // let arrayOfCurrentFifty = Array.prototype.slice.call( allFiftyMonsters )
            // arrayOfCurrentFifty.forEach(monster => {monster.remove()})
            const containerOfMonsters = document.getElementById("monster-container")
            containerOfMonsters.innerHTML=""

            fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
        }

        else if (e.target.id === "back"){
            if (pageCounter>1) {
                pageCounter -= 1
                // .children
                // let arrayOfCurrentFifty = Array.prototype.slice.call( allFiftyMonsters )
                // arrayOfCurrentFifty.forEach(monster => {monster.remove()})                
                const containerOfMonsters = document.getElementById("monster-container")
                containerOfMonsters.innerHTML=""
                fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
            }
            else {
                alert('you are already on the first page!')
            }
        }
    })


})



// function deleteObject(url, thingToDelete){
//   fetch(url, {
//     method: "DELETE"
//   })
//  .then(resp => resp.json())
//  .then(data => {thingToDelete.remove()})
//}