import React, { useState } from 'react';
import { ApiMeal, MealMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: ApiMeal;
  isLoading?: boolean;
}

const emptyState: MealMutation = {
  time: 'Breakfast',
  description: '',
  calories: '',
};

const MealForm: React.FC<Props> = ({
  onSubmit,
  existingMeal,
  isLoading = false,
}) => {
  const initialState: MealMutation = existingMeal
    ? { ...existingMeal, calories: existingMeal.calories.toString() }
    : emptyState;

  const [meal, setMeal] = useState<MealMutation>(initialState);

  const changeMeal = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setMeal((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...meal,
      calories: parseFloat(meal.calories),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingMeal ? 'Edit Meal' : 'Add New Meal'}</h4>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          required
          className="form-select"
          onChange={changeMeal}
          value={meal.time}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          required
          className="form-control"
          onChange={changeMeal}
          value={meal.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          name="calories"
          id="calories"
          required
          min="0"
          className="form-control"
          onChange={changeMeal}
          value={meal.calories.toString()}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingMeal ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default MealForm;
