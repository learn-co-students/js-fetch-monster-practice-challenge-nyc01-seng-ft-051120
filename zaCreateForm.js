// Create Form

    function createNewMonsterForm(){

        const formContainer = document.getElementById('create-monster')

        const form = document.createElement('form')
        form.id = "monster-form"
        form.innerHTML = `
                            <input id="name" placeholder="Your Monster's Name">
                            <input id="age" placeholder="Your Monster's Age">
                            <input id="description" placeholder="Description">  
                            <button>Create</button>
        `

        formContainer.append(form)
    }
    createNewMonsterForm()