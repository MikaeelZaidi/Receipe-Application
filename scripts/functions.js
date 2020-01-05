const getRecipes = () => {

    const recipeJSON = localStorage.getItem('recipeKey')
    if (recipeJSON !== null) {
        return JSON.parse(recipeJSON)
    }
    else {
        return []
    }
}

const removeRecipe = (id) => {

    const index = recipes.findIndex((r1) => {
        return r1.id === id
    })

    if (index > -1) {
        recipes.splice(index, 1)
    }
}

const generateRecipeDOM = (recipe) => {

    const $div = document.createElement('a')

    const $recipeEL = document.createElement('p')
    if (recipe.title.length > 0) {
        $recipeEL.textContent = recipe.title

    }
    else {
        $recipeEL.textContent = 'Unamed Recipe'
    }
 
 $recipeEL.classList.add('list-item__title')
    $div.appendChild($recipeEL)

    // const $deleteButton = document.createElement('button')
    // $deleteButton.textContent = "x"
    // $div.appendChild($deleteButton)
    // $deleteButton.addEventListener('click', (e) => {

    //      console.log(recipe)
    //     removeRecipe(recipe.id)
    //     renderRecipes(recipes, filters)
    //     localStorage.setItem('recipeKey', JSON.stringify(recipes))
    // })

    $div.setAttribute('href',`/recipe.html#${recipe.id}`)
    $div.classList.add('list-item')
    return $div
}

const renderRecipes = (recipes, filters) => {

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#recipes').innerHTML = " "

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const $recipeEL = generateRecipeDOM(recipe)
            document.querySelector('#recipes').appendChild($recipeEL)
        })
    }
    else {

        const $emptyMessage = document.createElement('p')
        $emptyMessage.textContent = "Add some recipes"
        $emptyMessage.classList.add('empty-message')
        document.querySelector('#recipes').appendChild($emptyMessage)
    }


}