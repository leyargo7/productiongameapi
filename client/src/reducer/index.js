
const initialState = {
    loading: false,
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    detail: [],
    post: [],
    errorResponse: [],
    
    
    
 
};
function rootReducer(state = initialState, action) {
    switch (action.type) {

            
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            }


        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            };

        /* case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
            } */

        case "GET_NAME_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload,
            }


        case "GET_GENRES_DB":
            return {
                ...state,
                genres: action.payload,

            }

        case "GET_PLATFORMS":
            return {
                ...state,
                platforms: action.payload,
            }

        case "POST_VIDEOGAME":
            return {
                ...state,
                post: action.payload,
                errorResponse: action.payload
                
            }
        
        case "ERROR_RESPONSE":
            return {
                ...state,
                errorResponse: action.payload,
            }
    


        case "UPDATE_VIDEOGAME":
            {
                return {
                    ...state,
                }
            }

        case "DELETE_VIDEOGAME":
            return {
                ...state,

            }

        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload,
            }




        case "FILTER_BY_GENRE":
            //aquí llega el payload con el valor del select
            const allVideogame = state.allVideogames;
            
            const genreFilter = action.payload === "All" ? allVideogame : allVideogame.filter(game => game.genres.includes(action.payload));
                 
          
            
            if(genreFilter.length === 0){
                alert(`No se encontraron coincidencias para el género ${action.payload} `)
                return state
            }else{

                return {
                    ...state,
                    videogames: genreFilter,
                }
            }

        case "FILTER_BY_CREATED":
            const filtered = action.payload === "created" ? state.allVideogames.filter((el) => el.createdInDb) : state.allVideogames.filter((el) => !el.createdInDb);
            return {
                ...state,
                videogames: action.payload === "All" ? state.allVideogames : filtered,
            }


        case "ORDER_BY_NAME":
            const orderByName = action.payload === "asc" ? state.videogames.sort((a, b) => {
                return a.name.localeCompare(b.name)
            }):
            state.videogames.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })

            return {
                ...state,
                videogames: action.payload === "order" ? state.allVideogames : orderByName,
            }


        

        default:
            return state;
    }
}

export default rootReducer;