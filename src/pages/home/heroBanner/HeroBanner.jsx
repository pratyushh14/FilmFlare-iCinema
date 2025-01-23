import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/popular?include_adult=false");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(String(bg));
  }, [data]);

  const searchQuery = (e) => {
    if (e.key === "Enter" && query.length !== 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleClick = () => {
    if (query.length !== 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      <div className="heroImage">{loading || <Img src={background} />}</div>
      <div className="opacityLayer"></div>
      <ContentWrapper>
        <div className="heroContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows, and people to discover. Expore Now
          </span>
          <div className="search">
            <input
              type="text"
              placeholder="Search for movie or TV shows"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => searchQuery(e)}
            />
            <button onClick={() => handleClick()}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
