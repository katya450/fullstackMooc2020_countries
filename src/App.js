import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setFetchedCountries(response.data);
    });
  }, []);

  const handleCountryFilter = (event) => {
    setSearch(event.target.value);
  };

  const countryNames = fetchedCountries.map((c) => c.name?.common);

  const filteredCountries = () =>
    countryNames.filter((n) => n.toLowerCase().includes(search.toLowerCase()));

  const countriesToShow = search === "" ? [] : filteredCountries();

  const countryInfo = (countryName) => {
    const countryData = fetchedCountries.find(
      (c) => c.name?.common === countryName
    );

    const countryFlag = Object.entries(countryData?.flags)[0][1];

    return (
      <div>
        <h2>{countryName}</h2>
        <div>Capital: {countryData?.capital[0]}</div>
        <div>Population: {countryData?.population}</div>
        <h3>Languages:</h3>
        <ul className="language-list">
          {Object.values(countryData?.languages).map((l) => (
            <li>{l}</li>
          ))}
        </ul>
        <img
          src={countryFlag}
          alt={`Flag of ${countryName}`}
          className="flag"
        />
      </div>
    );
  };

  const countries =
    countriesToShow.length === 1
      ? countryInfo(countriesToShow[0])
      : countriesToShow.map((c) => <div>{c}</div>);

  return (
    <div className="App">
      <header className="App-header">
        <div className="search">
          <label for="countrysearch">Hae?</label>
          <input name="countrysearch" onChange={handleCountryFilter}></input>
        </div>
      </header>
      <body>
        <div className="countries">
          {countriesToShow.length > 10 ? (
            <div>Rajaa enemmän, liikaa tuloksia (yli 10)</div>
          ) : (
            countries
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
