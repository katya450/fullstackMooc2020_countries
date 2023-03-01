import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [countryToShow, setCountryToShow] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setFetchedCountries(response.data);
    });
  }, []);

  const handleCountryFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
  };

  const countryNames = fetchedCountries.map((c) => c.name?.common);

  const filteredCountries = () =>
    countryNames.filter((n) => n.toLowerCase().includes(search.toLowerCase()));

  const countryList = search === "" ? [] : filteredCountries();

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

  useEffect(() => {
    setCountryToShow(selectedCountry);
  }, [selectedCountry]);

  const countries =
    countryList.length === 1
      ? countryInfo(countryList[0])
      : countryList.map((c) => (
          <div key={c}>
            {c} <button onClick={() => handleCountryClick(c)}>KLIK</button>
          </div>
        ));

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
          {countryList.length > 10 ? (
            <div>Rajaa enemmän, liikaa tuloksia (yli 10)</div>
          ) : (
            countries
          )}
          {countryList.length !== 1 && countryToShow !== "" && (
            <div>{countryInfo(selectedCountry)}</div>
          )}
        </div>
      </body>
    </div>
  );
};

export default App;
