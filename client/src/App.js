import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage';
import CreatePage from './CreatePage'
import ChartPage from "./ChartPage";

function App() {

  const [user, setUser] = useState(null)

  console.log(user)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <NavBar
        user={user}
        setUser={setUser}
      />

      <Routes>

        <Route
          path="/"
          element={<Homepage
            user={user}
            setUser={setUser}
          />}
        />

        <Route
          path="/create-new-chart"
          element={<CreatePage user={user}/>}
        />

        <Route
          path={`/:chartId`}
          element={<ChartPage/>}
        />

      </Routes>
    </div>
  );
}

export default App;
