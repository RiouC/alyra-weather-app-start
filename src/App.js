import { useState, useEffect } from "react";
import WeatherApp from "./components/WeatherApp";
import CityForm from "./components/CityForm";

function App() {
    const getTheme = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    const [darkMode, setDarkMode] = useState(getTheme);
    const [city, setCity] = useState("Paris");

    useEffect(() => {
        if (darkMode) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }, [darkMode]);
    
    return (
        <div className="container my-4">
          <h1 className="display-3 text-center mb-4">Météo Actuelle</h1>
          <WeatherApp city={city} />
          <CityForm city={city} setCity={setCity} />

          <div className="form-check form-switch mt-3 d-flex justify-content-end">
            <label className="form-check-label" htmlFor="activate"> Mode Sombre </label>
            <input
              className="form-check-input ms-2 mb-3"
              type="checkbox"
              id="activate"
              checked={darkMode}
              onChange={() => setDarkMode((darkMode) => !darkMode)} />
          </div>
        </div>
    );
}

export default App;
