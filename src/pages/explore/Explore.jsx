import React, { useEffect, useState } from "react";
import "./style.scss";
import Select from "react-select";
import { fetchData } from "../../util/api";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/spinner/Loader";
import Card from "../../components/card/Card";
import useFetch from "../../hooks/useFetch";
import makeAnimated from "react-select/animated";

const Explore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [genreSelected, setGenreSelected] = useState(null);
  const [sortSelected, setSortSelected] = useState(null);
  const [filter, setFilter] = useState({});
  const { mediaType } = useParams();

  const animatedComponents = makeAnimated();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const sortData = [
    { value: "vote_average.desc", label: "Rating" },
    { value: "popularity.desc", label: "Popularity" },
    { value: "primary_release_date.desc", label: "Release Data" },
    { value: "original_title.desc", label: "Title (A-Z)" },
  ];

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/discover/${mediaType}?page=${page}`, filter).then((res) => {
      setData(res.data);
      setPage((oldpage) => oldpage + 1);
      setLoading(false);
    });
  };

  const fetchNextData = () => {
    fetchData(`/discover/${mediaType}?page=${page}`, filter).then((res) => {
      setData({
        ...data,
        results: [...data?.results, ...res?.data?.results],
      });

      setPage((oldpage) => oldpage + 1);
    });
  };

  useEffect(() => {
    setData(null);
    setPage(1);
    fetchInitialData();
  }, [filter]);

  useEffect(() => {
    setData(null);
    setGenreSelected(null);
    setSortSelected(null);
    setPage(1);
    setFilter({});
    fetchInitialData();
  }, [mediaType]);

  const genresHandler = (selectedItems, action) => {
    setGenreSelected(selectedItems);

    let genresParam = "";
    selectedItems.map((selectedItem, i) => {
      genresParam += selectedItem.id;
      if (i !== selectedItems.length - 1) genresParam += ",";
    });

    if (action.action !== "clear") {
      setFilter((filter) => ({
        ...filter,
        with_genres: genresParam,
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        with_genres: "",
      }));
    }
  };

  const sortHandler = (selectedItem) => {
    setSortSelected(selectedItem);

    const filterObj = {
      sort_by: selectedItem.value,
    };

    setFilter((filter) => ({
      ...filter,
      ...filterObj,
    }));
  };

  return (
    <div className="exploreSection">
      {!loading ? (
        <>
          {data?.results?.length > 0 ? (
            <>
              <div className="exploreHeader">
                <div className="title">{`Search Result for ${mediaType.toUpperCase()}`}</div>
                <div className="selectDiv">
                  <Select
                    name="genres"
                    options={genresData?.genres}
                    value={genreSelected}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Select genres"
                    onChange={genresHandler}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    className="select"
                    classNamePrefix="selectInterior"
                  />
                  <Select
                    name="sortBy"
                    options={sortData}
                    value={sortSelected}
                    placeholder="Sort By"
                    onChange={sortHandler}
                    className="select"
                    Name="select"
                    classNamePrefix="selectInterior"
                  />
                </div>
              </div>
              <InfiniteScroll
                className="searchItems"
                dataLength={data?.results?.length}
                hasMore={page <= data?.total_pages}
                next={fetchNextData}
                loader={<Loader />}
              >
                {data?.results?.map((item, id) => (
                  <Card
                    item={item}
                    key={id}
                    explore={true}
                    mediaType={mediaType}
                  />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <div className="notFound">No Results Found!!</div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Explore;
