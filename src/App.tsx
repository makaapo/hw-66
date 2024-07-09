import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Meals from './containers/Meals/Meals';
import NewMeal from './containers/NewMeal/NewMeal';
import EditMeal from './containers/EditMeal/EditMeal';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/new-meal" element={<NewMeal />} />
        <Route path="/edit-meal/:id" element={<EditMeal />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
