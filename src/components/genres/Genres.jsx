import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Genres = ({ genre_ids }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genreIds">
      {genre_ids?.map((id) => (
        <div className="genreId" key={id}>
          {genres[id]}
        </div>
      ))}
    </div>
  );
};

export default Genres;
