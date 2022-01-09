const CountryList = ({filteredCountryList, buttonEventHandler}) => {
    return(
        <ul>
            {filteredCountryList.map(country => 
                <li key={country.ccn3}>{country.name.common}
                <button onClick={() => buttonEventHandler(country.name.common)}>show</button>
                </li>
            )}
        </ul>
    )
}

export default CountryList;