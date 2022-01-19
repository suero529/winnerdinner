import React from "react";
import Navbar from "../components/Navbar";
import MyJumbotron from "../components/MyJumbotron";
import axios from "axios";
import { useEffect, useState } from "react";
import MealsContainer from "../components/MealsContainer";

const Home = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      .then(({ data }) => setMeals(data.meals))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Navbar />
      <MyJumbotron />
      <h1>Winner Dinner</h1>
      <MealsContainer meals={meals} />
    </div>
  );
};

export default Home;
