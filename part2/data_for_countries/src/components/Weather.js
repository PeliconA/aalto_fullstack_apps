const Weather = ({countryCapital, data}) => {
    if (data === null) {
        return(
            <div>
                <h1>Weather in {countryCapital}</h1>
                <div>No weather data available.</div>
            </div>
        )
    }
    else {
        return(
            <div>
                <h1>Weather in {countryCapital}</h1>
                <p><b>temperature:</b> {data.temperature} Celsius</p>
                <img src={data.weatherIcon} alt="Weather icon goes here."></img>
                <p><b>wind:</b> {data.windSpeed} meter/sec; direction: {data.windDirection} degrees</p>
            </div>
        )
    }
}

export default Weather;