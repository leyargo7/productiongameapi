import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterByGenre,
  getGenresDb,
  filterByCreated,
  orderByName,
  setLoading,
} from "../actions";
import Loader from "./Loader";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./css/Home.module.css";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  /* paginado */
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [order, setOrder] = useState("");

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(getVideogames());
      await dispatch(getGenresDb());
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
    closeNav();
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    closeNav();
  };

  const handleFilterByCreated = (e) => {
    dispatch(filterByCreated(e.target.value));
    closeNav();
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    closeNav();
  };

  const openNav = () => {
    
    document.getElementById("myNav").style.width = "100%";
  };

  const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
  };

  return (
    <div>
      <div>
        <div className={style.overlay} id="myNav">
          <a
            href="javascript:void(0)"
            className={style.closebtn}
            id="closeNav"
            onClick={closeNav}
          >
            &times;
          </a>
          
          
          <nav className={style.navbar}>
            <Link to="/">
              <button>Start</button>
            </Link>
            <Link to="/create">
              <button>Create Video game</button>
            </Link>

            <button onClick={(e) => handleClick(e)}>Cargar de nuevo</button>

            <select onChange={(e) => handleOrderByName(e)}>
              <option value="order">Order</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>

            <select onChange={(e) => handleFilterByGenre(e)}>
              <option value="All">Genres</option>

              {genres?.map((g, i) => {
                return (
                  <option key={i} value={g.name}>
                    {g.name}
                  </option>
                );
              })}
            </select>

            <select onChange={(e) => handleFilterByCreated(e)}>
              <option value="All">New-Created</option>
              <option value="created">Creados</option>
              <option value="api">Existentes</option>
            </select>
          </nav>
        </div>
          <span id='openNav' onClick={openNav}> &#x2630;</span>

        <h1 style={{ textAlign: "center" }}>Video Game List</h1>
        <SearchBar />

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
      </div>

      <div className={style.listCards}>
        {loading ? (
          <Loader />
        ) : currentVideogames.length === 0 ? (
          <h3>No video game</h3>
        ) : (
          currentVideogames?.map((c, i) => {
            return (
              <div key={i}>
                <Link to={"/home/" + c.id} style={{ textDecoration: "none" }}>
                  <Card
                    key={c.id}
                    name={c.name}
                    image={c.image}
                    genres={c.genres}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>

      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />

      <Footer />
    </div>
  );
};

export default Home;
