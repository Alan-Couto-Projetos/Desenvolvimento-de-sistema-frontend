import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';


const Home = lazy(() => import('./Component/Home/Home'));
const CarForm = lazy(() => import('./Component/CarForm/CarForm'));
const CarDetail = lazy(() => import('./Component/CarDetail/CarDetail'));
const About = lazy(() => import('./Component/About/About'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ paddingTop: '56px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-car" element={<CarForm />} />
            <Route path="/carform/:id" element={<CarForm />} />
            <Route path="/cardetail" element={<CarDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
