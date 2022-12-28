export function setLoading(payload) {
  return {
    type: "SET_LOADING",
    payload,
  };
}

export function getVideogames() {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/videogames");
    const dataInfo = await data.json();
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: dataInfo,
    });
  };
}

export function getNameVideogame(payload) {
  return async function (dispatch) {
    try {
      const data = await fetch(
        `http://localhost:3001/videogamesname?name=${payload}`
      );
      const dataInfo = await data.json();
      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: dataInfo,
      });
    } catch (error) {
      console.log("No se encontró el juego");

      return dispatch({
        type: "GET_NAME_VIDEOGAME",
        payload: [],
      });
    }
  };
}

//videogame for id

export function getDetail(payload) {
  return async function (dispatch) {
    try {
      const data = await fetch(`http://localhost:3001/videogame/${payload}`);
      const dataInfo = await data.json();
      return dispatch({
        type: "GET_DETAILS",
        payload: dataInfo,
      });
    } catch (error) {
      console.log("No se encontró el juego");

      return dispatch({
        type: "GET_DETAILS",
        payload: [],
      });
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/videogame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataInfo = await data.json();
    return dispatch({
      type: "POST_VIDEOGAME",
      payload: dataInfo,
    });
  };
}

//ruta update
export function updateVideogame(payload) {
    console.log(payload.id)
  return async function (dispatch) {
    const data = await fetch(`http://localhost:3001/videogame/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataInfo = await data.json();
    return dispatch({
      type: "UPDATE_VIDEOGAME",
      payload: dataInfo,
    });
  };
}

//ruta delete videogame
export function deleteVideogame(payload) {
  return async function (dispatch) {
    try {
      const data = await fetch(`http://localhost:3001/videogame/${payload}`, {
        method: "DELETE",
      });
      const dataInfo = await data.json();
      return dispatch({
        type: "DELETE_VIDEOGAME",
        payload: dataInfo,
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: "DELETE_VIDEOGAME",
        payload: [],
      });
    }
  };
}

export function getGenresDb() {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/genresDb");
    const dataInfo = await data.json();

    return dispatch({
      type: "GET_GENRES_DB",
      payload: dataInfo,
    });
  };
}

/* FILTROS */

//ruta para que carguen los generos al select

//filtro por plataforma de la api
export function getPlatforms() {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/platforms");
    const dataInfo = await data.json();

    return dispatch({
      type: "GET_PLATFORMS",
      payload: dataInfo,
    });
  };
}

//filtro por genero
export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

//filtro creados o existentes
export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

/* ORDENAMIENTO */

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
