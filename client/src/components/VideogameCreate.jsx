import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postVideogame,
  getGenresDb,
  getPlatforms,
  getDetail,
  updateVideogame,
} from "../actions";
import { Link, useHistory, useParams } from "react-router-dom";
import style from './css/VideogameCreate.module.css'
import Footer from "./Footer";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.description) {
    errors.description = "Description is required";
  }
  if (!input.released) {
    errors.released = "Released is required";
  }
  if (!input.rating) {
    errors.rating = "Rating is required";
  }
  if (!input.platforms) {
    errors.platforms = "Platforms is required";
  }
  if (!input.genres) {
    errors.genres = "Genres is required";
  }
  if (!input.image) {
    errors.image = "Image is required";
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
  }, [dispatch, params.id]);

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

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenre = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
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
        alert("Videogame created successfully");
        setInput({
          name: "",
          description: "",
          released: "",
          rating: "",
          platforms: [],
          genres: [],
          image: "",
        });
      }
      history.push("/home");
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
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      {editing ? <h1>Edit Videogame</h1> : <h1>Create Videogame</h1>}

      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.name}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={style.description}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div className={style.released}>
          <label>Released:</label>
          <input
            type="text"
            name="released"
            value={input.released}
            onChange={(e) => handleChange(e)}
          />
          {errors.released && <p>{errors.released}</p>}
        </div>

        <div className={style.rating}>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p>{errors.rating}</p>}
        </div>

        <div className={style.image}>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p>{errors.image}</p>}
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

          {errors.platforms && <p>{errors.platforms}</p>}
        </div>

        {/* <ul>
          <li>{input.platforms.map((el) => el + ", ")}</li>
        </ul> */}

        {input.platforms.map((el) => (
          <div>
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
          {errors.genres && <p>{errors.genres}</p>}
        </div>

        {input.genres.map((el) => (
          <div>
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
          <button type="submit">
            {editing ? "Edit Videogame" : "Create Videogame"}
          </button>
        ) : (
          <p>We need all the data</p>
        )}
      </form>

      <Footer />
    </div>
  );
};

export default VideogameCreate;
