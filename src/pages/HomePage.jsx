import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { countryDatas } from '../components/CountryDatas';

const HomePage = () => {
  const navigate = useNavigate();
  const data = countryDatas((state) => state.data);
  const { setData, setPage, page, resetData, getData } = countryDatas();
  const scrollPosition = useRef();
  const body = document.body;

  useEffect(() => {
    const toggleButton = document.getElementById('mode-toggle');

    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-mode');
      toggleButton.querySelector('.nav_container_button--icon').textContent = '🌞';
    }

    toggleButton.addEventListener('click', () => {
      body.classList.toggle('light-mode');

      if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        toggleButton.querySelector('.nav_container_button--icon').textContent = '🌞';
      } else {
        localStorage.setItem('theme', 'dark');
        toggleButton.querySelector('.nav_container_button--icon').textContent = '🌙';
      }
    });
  }, [body]);

  const onScroll = useCallback(() => {
    if (window.scrollY + window.innerHeight >= scrollPosition.current.offsetTop) {
      console.log("Fetching more data...");
      setPage(page + 16);
    }
  }, [page, setPage]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    getData();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [page, onScroll, getData]);

  const searchCountry = (inputSearch) => {
    if (inputSearch.target.value) {
      resetData();
      const searchData = data.filter((item) =>
        item.name.toLowerCase().includes(inputSearch.target.value.toLowerCase())
      );
      setData(searchData);
    } else {
      resetData(); // Reset to the original data when the search is empty
    }
  };

  const sortByRegion = (regionType) => {
    resetData();
    if (regionType !== "all" && regionType !== "") {
      const sortData = useCountryStore
        .getState()
        .originalData.filter((item) => item.region.toLowerCase() === regionType);
      setData(sortData);
    } else {
      resetData();
    }
  };

  return (
    <>
      <header className="header">
        <Nav />
      </header>
      <section className="section">
        <div className="section_container">
          <div className="section_container_input">
            <p className="section_container_input--p">
              <label htmlFor="search">🔍</label>
            </p>
            <input
              id="search"
              name="search"
              className="section_container_input--input"
              placeholder="Search for a country..."
              type="text"
              onChange={(e) => searchCountry(e)}
            />
          </div>
          <div className="section_container_sort">
            <select
              className="section_container_sort--select"
              defaultValue={"DEFAULT"}
              onChange={(e) => sortByRegion(e.target.value)}
              name="sort"
              id="sort"
            >
              <option value="DEFAULT" disabled>
                Filter by Region
              </option>
              <option value="all">All countries</option>
              <option value="africa">Africa</option>
              <option value="americas">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="main_container">
          {data.map((item) => (
            <div
              key={item.numericCode}
              onClick={() => navigate(`info/${item.name}`)}
              className="main_component"
            >
              <div className="main_component_img">
                <img
                  className="main_component_img--img"
                  src={item.flags.png}
                  alt={item.name}
                />
              </div>
              <div className="main_component_text">
                <h4 className="main_component_text--name">{item.name}</h4>
                <div className="main_component_text--about">
                  <span className="main_component_text--span">
                    <h4 className="main_component_text--h4">Population:</h4>
                    <p className="main_component_text--p">
                      {item.population.toLocaleString()}
                    </p>
                  </span>
                  <span className="main_component_text--span">
                    <h4 className="main_component_text--h4">Region:</h4>
                    <p className="main_component_text--p">{item.region ?? "None"}</p>
                  </span>
                  <span className="main_component_text--span">
                    <h4 className="main_component_text--h4">Capital:</h4>
                    <p className="main_component_text--p">{item.capital ?? "None"}</p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="scrollDemo" ref={scrollPosition}>
          Loading...
        </div>
      </main>
    </>
  );
};

export default HomePage;
