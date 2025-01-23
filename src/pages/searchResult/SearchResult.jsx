import React, { useEffect, useState } from "react";
import "./style.scss";
import { fetchData } from "../../util/api";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/spinner/Loader";
import Card from "../../components/card/Card";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}`).then((res) => {
      setData(res.data);
      setPage((oldpage) => oldpage + 1);
      setLoading(false);
    });
  };

  const fetchNextData = () => {
    fetchData(`/search/multi?query=${query}&page=${page}`).then((res) => {
      setData({
        ...data,
        results: [...data?.results, ...res?.data?.results],
      });

      // if (data?.results) {
      //   setData({
      //     ...data,
      //     results: [...data?.results, ...res?.data?.results],
      //   });
      // } else {
      //   setData(res?.data);
      // }

      setPage((oldpage) => oldpage + 1);
    });
  };

  useEffect(() => {
    setData(null);
    setPage(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchSection">
      {!loading && data ? (
        <>
          {data?.results?.length > 0 ? (
            <>
              <div className="title">{`Search Result for ${query.toUpperCase()}`}</div>
              <InfiniteScroll
                className="searchItems"
                dataLength={data?.results?.length}
                hasMore={page <= data?.total_pages}
                next={fetchNextData}
                loader={<Loader />}
              >
                {data?.results?.map((item, id) => (
                  <Card item={item} key={id} />
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

export default SearchResult;
