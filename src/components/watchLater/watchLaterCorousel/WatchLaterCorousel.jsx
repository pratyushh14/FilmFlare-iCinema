import React, { useEffect, useRef, useState } from "react";
import "./style.scss";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ContentWrapper from "../../contentWrapper/ContentWrapper";
import Img from "../../lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from "../../circleRating/CircleRating";

const WatchLaterCorousel = ({ data }) => {
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

  useEffect(() => {
    setShowRight(
      corouselContainer.current.clientWidth <
        corouselContainer.current.scrollWidth
    );
  });

  return (
    <div className="watchLaterCorousel">
      <ContentWrapper>
        {showLeft && (
          <BsFillArrowLeftCircleFill
            className="arrow left"
            onClick={() => navigation("left")}
          />
        )}
        {showRight && (
          <BsFillArrowRightCircleFill
            className="arrow right"
            onClick={() => navigation("right")}
          />
        )}
        <div className="corouselItems" ref={corouselContainer}>
          {data?.map((item) => {
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
      </ContentWrapper>
    </div>
  );
};

export default WatchLaterCorousel;
