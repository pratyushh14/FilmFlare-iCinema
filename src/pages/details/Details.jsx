import React, { useEffect, useState } from "react";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import Videos from "./videos/Videos";
import CorouselSection from "../../pages/home/corouselSection/CorouselSection";
import { fetchProviderData } from "../../util/providersApi";

const Details = () => {
  const { mediaType, id } = useParams();

  const { loading: videoLoading, data: videoData } = useFetch(
    `/${mediaType}/${id}/videos`
  );

  const { loading: creditsLoading, data: creditsData } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const [providers, setProviders] = useState({});
  const [providersImage, setProvidersImage] = useState({});

  useEffect(() => {
    fetchProviderData("get", mediaType, id).then((data) => {
      setProviders(data?.result?.streamingInfo?.in);
    });

    fetchProviderData("countries").then((data) => {
      const providersDetails = data?.result?.in?.services;

      const imageObject = {};
      Object.entries(providersDetails).forEach(([key, value]) => {
        imageObject[key] = value.images.darkThemeImage;
      });

      setProvidersImage(imageObject);
    });
  }, [id]);

  return (
    <div>
      <DetailsBanner
        videos={videoData?.results?.[0]}
        crew={creditsData?.crew}
        providers={providers}
        providersImage={providersImage}
      />
      <Cast cast={creditsData?.cast} loading={creditsLoading} />
      <Videos videos={videoData?.results} loading={videoLoading} />
      <CorouselSection
        title={"More Like This"}
        initalEndpoint={mediaType}
        category={`${id}/similar`}
      />
    </div>
  );
};

export default Details;
