import React from "react";

const MealCard = ({ strMeal, strMealThumb }) => {
  return (
    <div>
      <div className="meal-card-box">
        <h3>{strMeal}</h3>
        <img className="recipe-image" src={strMealThumb} alt="food" />
        <button>See Recipe</button>
      </div>
    </div>
  );
};

export default MealCard;
