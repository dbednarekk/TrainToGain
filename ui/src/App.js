import './css/App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateWorkout from './pages/CreateWorkout';
import MyAccountPage from './pages/MyAccountPage';
import ListExercises from './pages/ListExercises';
import Workouts from './pages/Workouts';
import CreateExercise from './pages/CreateExercise';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/login/" element={ <Login/>} />
        <Route path="/register/" element={ <Register/>} />
        <Route path="/createWorkout/" element={<CreateWorkout />} />
        <Route path='/createExercise/' element={<CreateExercise/>} />
        <Route path="/myAccount/" element={<MyAccountPage />} />
        <Route path="/exercises/" element={<ListExercises />} />
        <Route path="/workouts/" element={<Workouts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
