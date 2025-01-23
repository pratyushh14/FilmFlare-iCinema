import React from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";

const Cast = ({ cast, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="castSkeleton">
        <div className="circle skeleton"></div>
        <div className="row1 skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    cast?.length > 0 && (
      <div className="castSection">
        {!loading ? (
          <ContentWrapper>
            <div className="castHeading">Top cast</div>
            <div className="castItems">
              {cast?.map((member, id) => {
                const src = member.profile_path
                  ? url.backdrop + member.profile_path
                  : avatar;

                return (
                  <div className="castItem" key={id}>
                    <div className="circle">
                      <Img src={src} />
                    </div>
                    <div className="originalName">{member.name}</div>
                    <div className="movieName">{member.character}</div>
                  </div>
                );
              })}
            </div>
          </ContentWrapper>
        ) : (
          <div className="castSkeletonSection">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </div>
    )
  );
};

export default Cast;
