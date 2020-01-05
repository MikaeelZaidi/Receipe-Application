let recipes = getRecipes()


filters = {
    searchText: ""
}

renderRecipes(recipes, filters)


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

document.querySelector('#form1').addEventListener('submit', (e) => {
    e.preventDefault()
    id1 = uuidv4()
    
        recipes.push({
            id: id1,
            title: "",
            Instructions: "",
            Ingredients: []
        })

        localStorage.setItem('recipeKey', JSON.stringify(recipes))
        //  e.target.elements.recipeInputName.value = " "
        //  renderRecipes(recipes, filters)
        location.assign('/recipe.html#' + id1)
    
})