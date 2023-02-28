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

  // TODO empty list when no filtered? instead of all the names. useState with empty array?

  const countryNames = fetchedCountries.map((c) => c.name?.common);

  const filteredCountries = countryNames.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

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
          {filteredCountries.map((c) => (
            <div>{c}</div>
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
