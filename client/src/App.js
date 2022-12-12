import './App.css';
import { Route, Routes } from "react-router-dom"
import { useState } from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage';
import CreatePage from './CreatePage'
import ChartPage from './ChartPage';

function App() {

  const [user, setUser] = useState({})

  return (
    <div>
      <NavBar></NavBar>
      <Routes>

        <Route
          path="/"
          element={<Homepage
            setUser={setUser}
          />}
        />

        <Route
          path="/create-new-chart"
          element={<CreatePage />}
        />

        <Route
          path="/your-chart"
          element={<ChartPage />}
        />

      </Routes>
    </div>
  );
}

export default App;
