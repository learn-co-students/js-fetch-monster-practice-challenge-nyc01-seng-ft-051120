console.log("test")
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    let currentPage = 1
    let currentMonsters = []
    const monsterContainer = document.getElementById('monster-container')
    let lastPage = false
    console.log(currentPage)
    

    const clickHandler = () => {
        console.log("clickHandler")
        document.addEventListener('click', (e) => {
            // e.preventDefault()
            if (e.target.id === "back" && currentPage > 1) {
                currentPage-=1
                console.log(currentPage)
            } else if (e.target.id === "forward" && currentMonsters.length === 50) {
                currentPage+=1
                console.log(currentPage)
            }
            fetchMonster()
        })
    }


    const fetchMonster = () => {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(monsters => {
            currentMonsters = monsters
            if (currentMonsters.length < 50){
                lastPage = true
            } else {
                lastPage = false
            }
            renderMonsters()
        })
    }

    const renderMonsters = () => {
        let ul = document.createElement('ul')
        currentMonsters.forEach(monster => {
            let li = createLi(monster)
            ul.append(li)
        })
        renderUl(ul)
    }

    const createLi = monster => {
        let li = document.createElement('li')
        li.innerText = `Name: ${monster.name}, Age: ${monster.age}, Description: ${monster.description}`
        return li
    }

    const renderUl = ul => {
        monsterContainer.innerText = ''
        monsterContainer.append(ul)
    }


    const formDiv = document.querySelector('div#create-monster')
        let formTag = document.createElement('form')
           let nameInput = document.createElement("input")
            nameInput.id = "name"
            nameInput.name = "name"
            nameInput.placeholder = "Name"
            formTag.append(nameInput)
        let ageInput = document.createElement('input')
            ageInput.id = "age"
            ageInput.name = "age"
            ageInput.placeholder = "Age"
            ageInput.type = "number"
            formTag.append(ageInput)
        let descriptionInput = document.createElement('input')
            descriptionInput.id = "description"
            descriptionInput.name = "description"
            descriptionInput.placeholder = "Description"
            formTag.append(descriptionInput)
        let submitButton = document.createElement('button')
            submitButton.id = "submit"
            submitButton.name = "submit"
            submitButton.type = "submit"
            submitButton.textContent = "Submit"
            formTag.append(submitButton)
        formDiv.append(formTag)
     
    const postNewMonster = monsterObj => {
        fetch('http://localhost:3000/monsters/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monsterObj)
        })
        .then(resp => resp.json())
        .then(monsterObj => {
            if (lastPage){
                currentMonsters.push(monsterObj)
                renderMonsters()
            }
        })
    }

    const submitHandler = e => {
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            let monsterObj = {}
            monsterObj.name = e.target.name.value
            monsterObj.age = e.target.age.value
            monsterObj.description = e.target.description.value
            postNewMonster(monsterObj)
            e.target.reset()
        })
       
    }




    console.log(formDiv)
    clickHandler()
    fetchMonster()
    submitHandler()
})
