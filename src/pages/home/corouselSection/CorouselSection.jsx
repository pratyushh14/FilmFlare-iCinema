import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Corousel from "../../../components/corousel/Corousel";

const Trending = ({ title, options, initalEndpoint, category }) => {
  const [endPoint, setEndPoint] = useState(initalEndpoint);
  const { data, loading } = useFetch(`/${endPoint}/${category}`);

  const tabsHandler = (currentTab) => {
    currentTab = currentTab.toLowerCase();
    setEndPoint(currentTab);
  };

  return (
    data?.results?.length > 0 && (
      <div className="corouselSection">
        <ContentWrapper>
          <span className="corouselTitle">{title}</span>
          <SwitchTabs data={options} tabsHandler={tabsHandler} />
        </ContentWrapper>
        <Corousel data={data} mediaType={endPoint} loading={loading} />
      </div>
    )
  );
};

export default Trending;
