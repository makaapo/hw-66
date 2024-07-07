import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NewMeal from './containers/NewMeal/NewMeal';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Meals</h1>}/>
        <Route path="/new-meal" element={<NewMeal/>}/>
      </Routes>
    </Layout>
  );
};

export default App;