import React, {useState} from 'react';
import MealForm from '../../components/MealForm/MealForm';
import axiosApi from '../../axiosApi';
import {ApiMeal} from '../../types';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const NewMeal = () => {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createMeal = async (meal: ApiMeal) => {
    try {
      setIsCreating(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
      toast.success('Meal created');
    } catch {
      toast.error('error when adding');
    } finally {
      setIsCreating(false);
    }
  };

  return <MealForm onSubmit={createMeal} isLoading={isCreating} />;
};

export default NewMeal;