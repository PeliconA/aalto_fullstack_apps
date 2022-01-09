import react, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from "./components/Filter";
import Note from './components/Note';
import CountryList from './components/CountryList';
import Country from './components/Country';

import getCountryLanguages from './lib/utils';

function App() {
  const [filterValue, setFilterValue] = useState('')
  const [countryList, setCountryList] = useState([])
  const [filteredCountryList, setFilteredCountryList] = useState([])
  const [displayedCountry, setDisplayedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountryList(response.data)
        console.log(response)
      })
  }, [])

  useEffect(() => {
    if (displayedCountry !== null) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${displayedCountry.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
          let weather = {
            temperature: response.data.main.temp,
            windSpeed: response.data.wind.speed,
            windDirection: response.data.wind.deg,
            weatherIcon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
          }
          setWeather(weather)
      })
      .catch(() => {
        setWeather(null)
      })
    }
  }, [displayedCountry])
  
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    const filteredCountryList = countryList.filter(country => 
                                                  country.name.common.toLowerCase()
                                                  .includes(filterValue.toLowerCase()))
    setFilteredCountryList(filteredCountryList)
    
    if(filteredCountryList.length === 1) {
      setDisplayedCountry(filteredCountryList[0])
    }
    else if(event.target.value == '') {
      setDisplayedCountry(null)
    }
  }

  const renderTooManyCountriesNote = () => {
    let tooManyCountriesNote;

    if (filteredCountryList.length > 10 && filterValue !== '') {
      tooManyCountriesNote = 
        <Note text={'Too many matches, specify another filter'} />
    }

    return tooManyCountriesNote
  }

  const renderCountryList = () => {
    let countryListComponent;

    if ((filteredCountryList.length < 10) && (filteredCountryList.length > 1)) {
      countryListComponent = 
        <CountryList filteredCountryList={filteredCountryList} 
                    buttonEventHandler={showCountryEventHandler}/>
    }
    return countryListComponent
  }

  const renderSpecificCountry = () => {
    let countryDisplay;

    if (displayedCountry) {      
      const languages = getCountryLanguages(displayedCountry)
      countryDisplay =
        <Country countryName={displayedCountry.name.common}
                countryCapital={displayedCountry.capital[0]}
                countryPopulation={displayedCountry.population}
                countryLanguages={languages}
                countryFlag={displayedCountry.flags.svg}
                weather={weather}/>      
    }

    return countryDisplay
  }

  const showCountryEventHandler = (countryName) => {
    let filteredCountry = filteredCountryList.filter(country =>
      country.name.common === countryName)[0] 
    setDisplayedCountry(filteredCountry)
  }

  return (
      <div>
        <Filter value={filterValue} eventHandler={handleFilterChange} />
        {renderTooManyCountriesNote()}
        {renderCountryList()}
        {renderSpecificCountry()}
      </div>
  )
}

export default App;
