import React from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import WatchLaterCorousel from "./watchLaterCorousel/WatchLaterCorousel";
import "./style.scss";

const WatchLater = ({ watchList }) => {
  console.log(watchList?.length);
  return (
    watchList?.length > 0 && (
      <div className="watchLaterSection">
        <ContentWrapper>
          <span className="corouselTitle">Watch Later</span>
        </ContentWrapper>
        <WatchLaterCorousel data={watchList} />
      </div>
    )
  );
};

export default WatchLater;
