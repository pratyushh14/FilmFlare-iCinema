import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PlayButton from "../playbutton/PlayButton";
import VideoPopup from "../videoPopup/VideoPopup";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Videos = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const videoContainer = useRef();

  useEffect(() => {
    const container = videoContainer.current;
    setShowRight(container?.clientWidth < container?.scrollWidth);
  }, [loading]);

  const skeleton = () => {
    return (
      <div className="videoSkeleton">
        <div className="poster skeleton"></div>
        <div className="row skeleton"></div>
      </div>
    );
  };

  const handleNavigation = (dir) => {
    const container = videoContainer.current;

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

  return (
    videos?.length > 0 && (
      <div className="videos">
        <ContentWrapper>
          {showLeft && (
            <BsFillArrowLeftCircleFill
              className={`arrow left`}
              onClick={() => handleNavigation("left")}
            />
          )}
          {!loading && showRight && (
            <BsFillArrowRightCircleFill
              className={`arrow right`}
              onClick={() => handleNavigation("right")}
            />
          )}
          {!loading ? (
            <>
              <div className="videoHeading">Official Videos</div>
              <div className="videoItems" ref={videoContainer}>
                {videos?.map((video, id) => (
                  <div
                    className="videoItem"
                    key={id}
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <div className="thumbnail">
                      <Img
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      />
                      <PlayButton />
                    </div>
                    <div className="title">{video.name}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="videosSkeleton">
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </ContentWrapper>
        <VideoPopup show={show} setShow={setShow} videoId={videoId} />
      </div>
    )
  );
};

export default Videos;
