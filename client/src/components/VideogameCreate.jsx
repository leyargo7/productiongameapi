import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postVideogame,
  getGenresDb,
  getPlatforms,
  getDetail,
  updateVideogame,
  errorResponse
} from "../actions";
import { Link, useHistory, useParams } from "react-router-dom";
import style from "./css/VideogameCreate.module.css";
import Footer from "./Footer";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "The name must have between 3 and 50 characters";
  } else if (!input.description) {
    errors.description = "Description must be between 10 and 500 characters";
  } else if (!input.released) {
    errors.released = "Released: The Date must be in the format YYYY-MM-DD";
  } else if (!input.rating) {
    errors.rating = "Rating: must be a number between 0.1 and 5.0";
  } else if (!input.platforms) {
    errors.platforms = "Platforms is required";
  } else if (!input.genres) {
    errors.genres = "Genres is required";
  } else if (!input.image) {
    errors.image = "Image: must be a valid URL";
  }
  return errors;
}

const VideogameCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const detail = useSelector((state) => state.detail);
  
  const errorRes = useSelector((state) => state.errorResponse);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    image: "",
  });

  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    
    if (params.id) {
      setEditing(true);
      dispatch(getDetail(params.id));
      setInput({
        id: detail.id,
        name: detail.name,
        description: detail.description,
        released: detail.released,
        rating: detail.rating,
        platforms: detail.platforms,
        genres: detail.genres,
        image: detail.image,
      });
    }
    const fetchData = async () => {
      await dispatch(getPlatforms());
    };

    fetchData();

      
    if(errorRes.errors){
      alert("Please correct the errors")
    }
    if(errorRes.createdInDb){
      alert("Videogame created successfully");
      history.push("/home");
    }
  
  }, [dispatch, params.id, errorRes]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectPlatform = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };

  const handleSelectGenre = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      dispatch(updateVideogame(input, params.id));
      alert("Videogame updated successfully");
      history.push("/home");
    } else {
      if (
        !input.name ||
        !input.description ||
        !input.released ||
        !input.rating ||
        !input.platforms ||
        !input.genres ||
        !input.image
      ) {
        alert("All fields are required");
        return;
      } else {
        dispatch(postVideogame(input));

        /* setInput({
          name: "",
          description: "",
          released: "",
          rating: "",
          platforms: [],
          genres: [],
          image: "",
        });  */
        /* alert("Videogame created successfully");
        history.push("/home"); */
      }
    }
  };



  const handleDeletePlatform = (el) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((e) => e !== el),
    });
  };

  const handleDeleteGenre = (el) => {
    setInput({
      ...input,
      genres: input.genres.filter((e) => e !== el),
    });
  };


  return (
    <div className={style.createForm}>
      <Link to="/home">
        <button className={style.back}>Back</button>
      </Link>
      {editing ? <h1>Edit Videogame</h1> : <h1>Create Videogame</h1>}

      {  
          errorRes && errorRes.errors && errorRes.errors.map((e, i) => {
            return (
              <div key={i} className={style.setErrors}>
                <p>&#10071; {e.message}</p>
              </div>
            )
          })
       }
      

      <form onSubmit={(e) => handleSubmit(e)} className={style.form} autoComplete="off">
        <div className={style.name}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className={`${style.toast} ${style.appear}`}>{errors.name}</p>
          )}
        </div>

        <div className={style.description}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
          {errors.description && (
            <p className={`${style.toast} ${style.appear}`}>
              {errors.description}
            </p>
          )}
        </div>

        
        <div className={style.released}>
          <label>Released:</label>
          <input
            type="text"
            name="released"
            placeholder="yyyy-mm-dd"
            value={input.released}
            onChange={(e) => handleChange(e)}
          />
          {errors.released && (
            <p className={`${style.toast} ${style.appear}`}>
              {errors.released}
            </p>
          )}
        </div>

        <div className={style.rating}>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="0.1 - 5.0"
            step="0.1"
            min="0.1"
            max="5"
            value={input.rating}
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && (
            <p className={`${style.toast} ${style.appear}`}>{errors.rating}</p>
          )}
        </div>

        <div className={style.image}>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
          />
          {errors.image && (
            <p className={`${style.toast} ${style.appear}`}>{errors.image}</p>
          )}
        </div>

        <div className={style.platform}>
          <label>Platforms:</label>
          <select name="platforms" onChange={(e) => handleSelectPlatform(e)}>
            <option value=""></option>
            {platforms.map((platform, i) => {
              return (
                <option key={i} value={platform}>
                  {platform}
                </option>
              );
            })}
          </select>
        </div>

        {input.platforms.map((el, i) => (
          <div key={i}>
            <p>{el}</p>
            <button onClick={() => handleDeletePlatform(el)}>X</button>
          </div>
        ))}

        <div className={style.genres}>
          <label>Genres:</label>
          <select onChange={(e) => handleSelectGenre(e)}>
            <option value=""></option>
            {genres.map((genre, i) => {
              return (
                <option key={i} value={genre.name}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>

        {input.genres.map((el, i) => (
          <div key={i}>
            <p>{el}</p>
            <button onClick={() => handleDeleteGenre(el)}>X</button>
          </div>
        ))}

        {input.name &&
        input.description &&
        input.released &&
        input.rating &&
        input.platforms.length > 0 &&
        input.genres.length > 0 &&
        input.image ? (
          <button type="submit" className={style.btnCreate}>
            {editing ? "Edit Videogame" : "Create Videogame"}
          </button>
        ) : (
          <p className={style.messageInfo}>We need all the data</p>
        )}
      </form>

      <div className={style.last}></div>

      <Footer />
    </div>
  );
};

export default VideogameCreate;
