import Weather from './Weather';

const Country = ({countryName, countryCapital,
                    countryPopulation, countryLanguages,
                    countryFlag, weather}) => {
    return(
        <div>
            <h1>{countryName}</h1>
            <p>
                capital: {countryCapital} <br />
                population: {countryPopulation}
            </p>
            <h2>languages</h2>
            <ul>
                {countryLanguages.map(language => 
                    <li key={language.key}>{language.language}</li>
                )}
            </ul>
            <img src={countryFlag} alt="Country flag" width="125" height="75"></img>
            <Weather countryCapital={countryCapital}
                    data={weather}/>
        </div>
    )
}

export default Country;