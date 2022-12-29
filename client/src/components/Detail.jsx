import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteVideogame } from "../actions";
import { useHistory } from "react-router-dom";
import style from "./css/Detail.module.css";
import Footer from "./Footer";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myDetail = useSelector((state) => state.detail);

  const handleDelete = (e) => {
    e.preventDefault();
    let option = window.confirm("Are you sure you want to delete this game?");
    if (option) {
      dispatch(deleteVideogame(myDetail.id));
      alert("Game deleted");
      history.push("/home");
    }else{
        alert("Game not deleted");
    }
  };

  return (
    <div className={style.detail}>
      {Object.entries(myDetail).length > 0 ? (
        <div className={style.container}>
          <h1>{myDetail.name}</h1>
          <img
            src={myDetail.image}
            alt={myDetail.name}
            width="500px"
            height="700px"
          />
          <p className={style.description}><strong>Description:</strong> {myDetail.description.replace(/<[^>]*>?/g, "")}</p>
          <p className={style.released}><strong>Released:</strong> {myDetail.released}</p>
          <p className={style.rating}><strong>Rating:</strong> {myDetail.rating}</p>
          <p className={style.platforms}><strong>Plataforms:</strong> {myDetail.platforms.map((p) => p).join(", ")}</p>
          <p className={style.genres}><strong>Genres:</strong> {myDetail.genres.map((g) => g).join(", ")}</p>

          {myDetail.createdInDb ? (
            <div>
              <button onClick={() => history.push(`/home/${myDetail.id}/edit`)}>Edit</button>
              <button onClick={e=>handleDelete(e)}>Delete</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Link to="/home" className={style.home}>
        <button>Go Home</button>
      </Link>

      <Footer />
    </div>
  );
};

export default Detail;
