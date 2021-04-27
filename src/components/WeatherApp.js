import { useState, useEffect } from "react";

import Icon from "./Icon";
import Description from "./Description";
import Temperature from "./Temperature";
import Humidity from "./Humidity";

const WeatherApp = ({city}) => {
    const [conditions, setConditions] = useState({});
    const [description, setDescription] = useState("");
    const [iconID, setIconId] = useState("");
    const [location, setLocation] = useState("");
    const {mainTemp, feelsLike, humidity} = conditions;
    const [apiCallsCount, setApiCallsCount] = useState(0);
    
    useEffect(() => {
        // setApiCallsCount(apiCallsCount + 1);
        console.log(apiCallsCount);

        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        console.log(apiKey);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
        fetch(url)
            .then((response) => {
                setApiCallsCount(a => a + 1);
                console.log(response);
                if (!response.ok) {
                    throw new Error("Météo introuvable");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setLocation(`${data.name}, ${data.sys.country}`);
                setConditions({
                    mainTemp: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    humidity: data.main.humidity
                });
                setDescription(data.weather[0].description);
                setIconId(data.weather[0].icon);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [city]);

    
    return (
        <>
          {!!location && (
              <section className="text-center">
                <Icon iconID={iconID} />
                <h2 className="mb-4">Conditions météo à {location}</h2>
                <Description description={description} />
                <Temperature mainTemp={mainTemp} feelsLike={feelsLike} />
                <Humidity humidity={humidity} />
              </section>
          )}
        </>
    );
};

export default WeatherApp;
