import React from 'react';
import { Meal } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const MealItem: React.FC<Props> = ({ meal, onDelete, isDeleting }) => (
  <div className="card mb-2">
    <div className="card-body d-flex justify-content-between align-items-center">
      <div>
        <h5 className="card-title opacity-50">{meal.time}</h5>
        <p className="card-text">{meal.description}</p>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <p className="card-text me-5 mb-0">
          <strong>{meal.calories}</strong> kcal
        </p>
        <div className="d-flex flex-column">
          <Link to={`/edit-meal/${meal.id}`} className="btn fs-4">
            <i className="bi bi-pencil-square text-primary"></i>
          </Link>
          <button
            onClick={() => onDelete(meal.id)}
            className="btn fs-4 d-block"
            disabled={isDeleting}
          >
            {isDeleting && <ButtonSpinner />}
            <i className="bi bi-trash-fill text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default MealItem;
