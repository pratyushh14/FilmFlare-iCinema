import React, { useRef, useState } from "react";
import "./style.scss";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Corousel = ({ data, loading, mediaType }) => {
  const corouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const navigation = (dir) => {
    const container = corouselContainer.current;

    const scrollAmount =
      dir === "right"
        ? container.scrollLeft + container.offsetWidth + 20
        : container.scrollLeft - (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });

    setShowLeft(scrollAmount > 0);
    setShowRight(
      container.scrollLeft + (container.offsetWidth + 20) * 2 <
        container.scrollWidth
    );
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="poster skeleton"></div>
        <div className="textBlock">
          <div className="text skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="corousel">
      <ContentWrapper>
        {showLeft && (
          <BsFillArrowLeftCircleFill
            className="arrow left"
            onClick={() => navigation("left")}
          />
        )}
        {!loading && showRight && (
          <BsFillArrowRightCircleFill
            className="arrow right"
            onClick={() => navigation("right")}
          />
        )}
        {!loading ? (
          <div className="corouselItems" ref={corouselContainer}>
            {data?.results?.map((item) => {
              const src = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div
                  className="corouselItem"
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || mediaType}/${item.id}`)
                  }
                >
                  <div className="poster">
                    <Img src={src}></Img>
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres genre_ids={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="text">{item.title || item.name}</span>
                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Corousel;
