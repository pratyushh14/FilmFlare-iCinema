import React, { useContext, useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { refdb, database } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import CorouselSection from "./corouselSection/CorouselSection";
import WatchLater from "../../components/watchLater/WatchLater";

const Home = ({ setNoHeader, setNoFooter }) => {
  const [watchList, setWatchList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setNoFooter(false);
    setNoHeader(false);
  }, []);

  useEffect(() => {
    onValue(refdb(database, "users/" + user.uid), (snapshot) => {
      setWatchList(snapshot.val()?.watchLater || []);
    });
  }, [user]);

  return (
    <div>
      <HeroBanner />
      <WatchLater watchList={watchList} />
      <Trending></Trending>
      <CorouselSection
        title={"what's Popular"}
        options={["Movie", "TV"]}
        initalEndpoint={"movie"}
        category={"popular"}
      />
      <CorouselSection
        title={"Top Rated"}
        options={["Movie", "TV"]}
        initalEndpoint={"movie"}
        category={"top_rated"}
      />
      <CorouselSection
        title={"Upcoming"}
        options={[""]}
        initalEndpoint={"movie"}
        category={"upcoming"}
      />
      <CorouselSection
        title={"On The Air Tv shows"}
        options={[""]}
        initalEndpoint={"tv"}
        category={"on_the_air"}
      />
    </div>
  );
};

export default Home;
