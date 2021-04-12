const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {

        mealDetailsContent.parentElement.classList.remove('showRecipe');
    })
    // get meal list that matches with the ingredients
function getMealList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    // console.log(searchInputText.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    idd = meal.idMeal;
                    html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>"${meal.strMeal}"</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                    mealList.classList.remove("notFound");
                });
            } else {
                mealList.classList.add("notFound")
                html += "Sorry, cannot find !"
            }
            mealList.innerHTML = html;
        });
}
// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    console.log(e.target.classList.contains('recipe-btn'));
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem.dataset.id);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())

        .then(data => mealRecipeModal(data));
    }

}

function mealRecipeModal(meal) {
    meal = meal["meals"];
    meal = meal[0];
    console.log(meal);

    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p class="inst-text">${meal.strInstructions}</p>
        </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Vedio</a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}