import React from 'react';
import {Meal} from '../../types';
import {Link} from 'react-router-dom';
interface Props {
  meal: Meal;
}

const MealItem: React.FC<Props> = ({meal}) => (
  <div className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{meal.time}</h5>
      <p className="card-text">{meal.description}</p>
      <p className="card-text"><strong>{meal.calories}</strong> kcal</p>
      <div className="d-flex gap-2">
        <Link to={'/edit-meal'} className="btn btn-secondary">Edit</Link>
        <button className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default MealItem;