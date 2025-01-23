import React from "react";
import "./style.scss";
import PosterFallback from "../../assets/no-poster.png";
import { useSelector } from "react-redux";
import Img from "../../components/lazyLoadImage/Img";
import { useNavigate } from "react-router-dom";
import CircleRating from "../../components/circleRating/CircleRating";

const Card = ({ item, explore, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const src = item.poster_path ? url.poster + item.poster_path : PosterFallback;
  const navigate = useNavigate();

  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}
    >
      <div className="poster">
        <img src={src} />
        {explore && <CircleRating rating={item?.vote_average?.toFixed(1)} />}
      </div>
      <div className="textBlock">
        <span className="text">{item.title || item.name}</span>
      </div>
    </div>
  );
};

export default Card;
