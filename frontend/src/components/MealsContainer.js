import React from "react";
import MealCard from "./MealCard";

const MealsContainer = ({ meals }) => {
  return (
    <div>
      {meals.map((meal) => (
        <MealCard {...meal} />
      ))}
    </div>
  );
};

export default MealsContainer;
