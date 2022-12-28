import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteVideogame } from "../actions";
import { useHistory } from "react-router-dom";

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
    <div>
      {Object.entries(myDetail).length > 0 ? (
        <div>
          <h1>{myDetail.name}</h1>
          <img
            src={myDetail.image}
            alt={myDetail.name}
            width="500px"
            height="700px"
          />
          <p>Description: {myDetail.description.replace(/<[^>]*>?/g, "")}</p>
          <p>Released: {myDetail.released}</p>
          <p>Rating: {myDetail.rating}</p>
          <p>Plataforms: {myDetail.platforms.map((p) => p).join(", ")}</p>
          <p>Genres: {myDetail.genres.map((g) => g).join(", ")}</p>

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
      <Link to="/home">
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default Detail;
