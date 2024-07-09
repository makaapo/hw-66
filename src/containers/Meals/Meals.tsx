import React, { useCallback, useEffect, useState } from 'react';
import { ApiMealsList, Meal } from '../../types';
import axiosApi from '../../axiosApi';
import MealItem from '../../components/MealItem/MealItem';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const { data: meals } = await axiosApi.get<ApiMealsList>('/meals.json');
      const addedMeals: Meal[] = meals
        ? Object.keys(meals).map((id) => ({
            id,
            ...meals[id],
          }))
        : [];
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

  const deleteMeal = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        setIsDeleting(true);
        await axiosApi.delete(`/meals/${id}.json`);
        toast.success('Meal deleted');
        await fetchMeals();
      } catch (error) {
        toast.error('Error deleting meal');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <h5>Total Calories: {totalCalories} kcal</h5>
        <Link to="/new-meal" className="btn btn-primary">
          Add new meal
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onDelete={deleteMeal}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
