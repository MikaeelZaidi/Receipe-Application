const recipEid = location.hash.substring(1)

const recipes = getRecipes()


const recipe = recipes.find((recipe) => {
    return recipe.id === recipEid
})

console.log(recipe)

if (recipe === undefined) {
    location.assign('index.html')
}

$RecipeTitle = document.querySelector('#recipe-title')
$recipeInstrunctions = document.querySelector('#recipe-instructions')

$RecipeTitle.value = recipe.title
$recipeInstrunctions.value = recipe.Instructions

$RecipeTitle.addEventListener('change', (e) => {
    recipe.title = $RecipeTitle.value
    localStorage.setItem('recipeKey', JSON.stringify(recipes))

})

$recipeInstrunctions.addEventListener('change', (e) => {
    recipe.Instructions = $recipeInstrunctions.value
    localStorage.setItem('recipeKey', JSON.stringify(recipes))
})

document.querySelector('#remove-recipe').addEventListener('click', (e) => {

    removeRecipe(recipe.id)
    localStorage.setItem('recipeKey', JSON.stringify(recipes))
    location.assign('/index.html')
})

document.querySelector('#form2').addEventListener('submit', (e) => {

    e.preventDefault()
    console.log(e.target.elements.form2input.value)

    if (e.target.elements.form2input.value.trim().length > 0) {

        recipe.Ingredients.push({

            name: e.target.elements.form2input.value,
            value: false,
        })

        e.target.elements.form2input.value = ""
        renderIngredients(recipe)
        localStorage.setItem('recipeKey', JSON.stringify(recipes))
    }

    else {

        console.log('error')
    }
})

const deleteIngredient = (title) => {

    const index = recipe.Ingredients.findIndex((t1) => {

        return t1.name === title
    })

    if (index > -1) {
        recipe.Ingredients.splice(index, 1)
    }
}

const renderIngredients = (recipe) => {
    document.querySelector('#ingredients').innerHTML = " "

    recipe.Ingredients.forEach((ingredient) => {
        
        const $div = document.createElement('label')
        const containerEL = document.createElement('div')
        const $ingredEL = document.createElement('span')

        $ingredEL.textContent = ingredient.name
        containerEL.appendChild($ingredEL)

        $div.classList.add('list-item')
        containerEL.classList.add('list-item__container')
        $div.appendChild(containerEL)

        const $recipedelButton = document.createElement('button')
        $recipedelButton.textContent = "Delete"
        $recipedelButton.classList.add('button2','button2--text')
        $div.appendChild($recipedelButton)

        $recipedelButton.addEventListener('click', (e) => {
            deleteIngredient(ingredient.name)
            renderIngredients(recipe)
            localStorage.setItem('recipeKey', JSON.stringify(recipes))
        })

       document.querySelector('#ingredients').appendChild($div)

    })
}

renderIngredients(recipe)

document.querySelector('#home-button').addEventListener('click',()=>{
    console.log('buttonclicled')
    location.assign('/index.html')
})