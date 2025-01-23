import React from "react";
import "./style.scss";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId }) => {
  const closeHandeler = () => {
    setShow(false);
  };

  return (
    show && (
      <div className="videoPopup">
        <div
          className="popupOpacityLayer"
          onClick={() => closeHandeler()}
        ></div>
        <div className="content">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="100%"
            controls
            // config={{
            //   youtube: {
            //     playerVars: {
            //       origin: "http://localhost:5173",
            //     },
            //   },
            // }}
          />
          <button onClick={() => closeHandeler()}>❌</button>
        </div>
      </div>
    )
  );
};

export default VideoPopup;
