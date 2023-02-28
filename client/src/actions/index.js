//const serverUrl = "https://productiongameapi-production.up.railway.app"
//const serverUrl = "https://c595-2800-e2-4f80-24a-251a-ea0d-a1b1-dab0.ngrok.io"
const serverUrl = "https://bbc7-181-49-18-125.ngrok.io"

export function setLoading(payload) {
  return {
    type: "SET_LOADING",
    payload,
  };
}

export function getVideogames() {
  return async function (dispatch) {
    const data = await fetch(`${serverUrl}/videogames`, {
      'mode': 'no-cors',
      'headers': {
        'Access-Control-Allow-Origin': 'https://productiongameapi.vercel.app/'
      }
    });
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
        `${serverUrl}/videogamesname?name=${payload}`
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
      const data = await fetch(`${serverUrl}/videogame/${payload}`);
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
  let obj;
  return function (dispatch) {
    fetch(`${serverUrl}/videogame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then ((res) => {
        obj = res;
        
      })
      .then((res) => dispatch({ type: "POST_VIDEOGAME", payload: obj }))
      .catch((err) => { 
        console.log(err);
      });
    
    
  };
}

//ruta update
export function updateVideogame(payload) {
  
  return async function (dispatch) {
    const data = await fetch(`${serverUrl}/videogame/${payload.id}`, {
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
      const data = await fetch(`${serverUrl}/videogame/${payload}`, {
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
    const data = await fetch(`${serverUrl}/genresDb`);
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
    const data = await fetch(`${serverUrl}/platforms`);
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

//errorResponse
export function errorResponse(payload) {
  return {
    type: "ERROR_RESPONSE",
    payload,
  };
}

