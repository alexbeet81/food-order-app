import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { error, isLoading, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    // fetchMealsHandler();
    const transformMeals = (mealObject) => {
      const loadedMeals = [];

      for (const mealKey in mealObject) {
        loadedMeals.push({
          id: mealKey,
          name: mealObject[mealKey].name,
          description: mealObject[mealKey].description,
          price: mealObject[mealKey].price
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals({
      url: "https://react-http-7b544-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
    },
    transformMeals
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = (
    <Card>
      <p>no meals found...</p>
    </Card>
  );

  if (mealsList.length > 0) {
    content = <Card>{mealsList}</Card>;
  }

  if (error) {
    content = (
      <Card>
        <p>Error: {error}</p>
      </Card>
    );
  }

  if (isLoading) {
    content = (
      <Card>
        <p className={classes.MealsLoading}>loading...</p>
      </Card>
    );
  }

  return (
    <section className={classes.meals}>
      <ul>{content}</ul>
    </section>
  );
};

export default AvailableMeals;
