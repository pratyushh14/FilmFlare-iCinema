import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { fetchData } from "./util/api";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";
import { AuthContext } from "./context/authContext";

function App() {
  // const dispatch = useDispatch();
  // const { url } = useSelector((state) => state.home);

  // useEffect(() => {
  //   apiTest();
  // }, []);

  // const apiTest = () => {
  //   fetchData("/movie/popular").then((res) => {
  //     console.log(res.data);
  //     dispatch(getApiConfig(res.data));
  //   });
  // };

  const dispatch = useDispatch();
  const [noHeader, setNoHeader] = useState(false);
  const [noFooter, setNoFooter] = useState(false);

  useEffect(() => {
    fetchApiConfig();
    genreConfig();
  }, []);

  const fetchApiConfig = () => {
    // fetchData("/configuration").then((res) => {
    //   const imagePath = res.data.images.secure_base_url + "original";

    //   const url = {
    //     backdrop: imagePath,
    //     poster: imagePath,
    //     profile: imagePath,
    //   };

    //   dispatch(getApiConfig(url));
    // });
    const imagePath = "https://image.tmdb.org/t/p/original";

    const url = {
      backdrop: imagePath,
      poster: imagePath,
      profile: imagePath,
    };

    dispatch(getApiConfig(url));
  };

  const genreConfig = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.map((type) => {
      promises.push(fetchData(`/genre/${type}/list`));
    });

    const responses = await Promise.all(promises);
    const data = responses.map((res) => res.data);

    data.map(({ genres }) => {
      return genres.map((genre) => {
        return (allGenres[genre.id] = genre.name);
      });
    });

    dispatch(getGenres(allGenres));
  };

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header noHeader={noHeader} />
      <Routes>
        <Route
          path="/"
          element={
            <Register
              setNoHeader={setNoHeader}
              setNoFooter={setNoFooter}
            ></Register>
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              <Home setNoHeader={setNoHeader} setNoFooter={setNoFooter}></Home>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/:mediaType/:id" element={<Details></Details>} />
        <Route path="/explore/:mediaType" element={<Explore></Explore>} />
        <Route path="/search/:query" element={<SearchResult></SearchResult>} />
        <Route path="*" element={<PageNotFound></PageNotFound>} />
      </Routes>
      <Footer noFooter={noFooter} />
    </BrowserRouter>
  );
}

export default App;
