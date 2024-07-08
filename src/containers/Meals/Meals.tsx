import React, {useCallback, useEffect, useState} from 'react';
import {ApiMealsList, Meal} from '../../types';
import axiosApi from '../../axiosApi';
import MealItem from '../../components/MealItem/MealItem';
import Spinner from '../../components/Spinner/Spinner';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const {data: meals} = await axiosApi.get<ApiMealsList>('/meals.json');
      const addedMeals: Meal[] = meals ? Object.keys(meals).map((id) => ({
        id,
        ...meals[id],
      })) : [];
      setMeals(addedMeals);
    } catch (error) {
      toast.error('error loading meals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);



  const totalCalories = meals.reduce((sum, meal) => {
    return sum + meal.calories;
  }, 0);



  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between mb-2">
        <h5>Total Calories: {totalCalories} kcal</h5>
        <h4>Meals</h4>
        <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;