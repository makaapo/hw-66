import React, { useCallback, useEffect, useState } from 'react';
import MealForm from '../../components/MealForm/MealForm';
import axiosApi from '../../axiosApi';
import { ApiMeal, Meal } from '../../types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const EditMeal = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchMeal = useCallback(async () => {
    const { data: meal } = await axiosApi.get<Meal>(`/meals/${id}.json`);
    setMeal(meal);
  }, [id]);

  useEffect(() => {
    void fetchMeal();
  }, [fetchMeal]);

  const updateMeal = async (meal: ApiMeal) => {
    try {
      setIsUpdating(true);
      await axiosApi.put(`/meals/${id}.json`, meal);
      toast.success('Meal updated');
    } catch (error) {
      toast.error('error when updating');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!meal) {
    return <Spinner />;
  }

  return (
    <MealForm
      onSubmit={updateMeal}
      existingMeal={meal}
      isLoading={isUpdating}
    />
  );
};

export default EditMeal;
