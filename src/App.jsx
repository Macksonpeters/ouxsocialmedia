import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, NavLink } from "react-router-dom";
import useApiGet from "./hooks/UseApiGet";
import Articles from "./Components/Articles";
import { db } from "./firebase";
import GetUserName from "./Components/modals/GetUserName";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Components/spinner/Spinner";
import { ImArrowUp2 } from "react-icons/im";
import { BiSearch } from "react-icons/bi";
import { BsArrowUpCircle } from "react-icons/bs";
import {
  updateLoadingData,
  updateSearchData,
  updateToggleModal,
} from "./redux/slice";
import SearchResults from "./Components/modals/SearchResults";

const App = () => {
  // const [dataA, setDataA] = useState([]);
  const userName = useSelector((store) => store.appReducer.name);
  const loadingData = useSelector((store) => store.appReducer.loadingData);
  const toggleModalValue = useSelector((store) => store.appReducer.toggleModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [errorA, setErrorA] = useState(null);
  const [errorB, setErrorB] = useState(null);
  const [isLoadingA, setIsLoadingA] = useState(true); // Initialize as true
  const [isLoadingB, setIsLoadingB] = useState(true); // Initialize as true
  const [isVisible, setIsVisible] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  // const [displaySearch, setDisplaySearch] = useState(toggleModal);

  //Fetching world News
  const url =
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=fS8iRczRqdTpWgHlGExQsiIeaoUra38f";

  const fetchData = () => {
    setIsLoadingA(true); // Set loading to true when starting fetch
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setDataA(fetchedData);
        setIsLoadingA(false); // Set loading to false after successful fetch
      })
      .catch((fetchError) => {
        setErrorA(fetchError);
        setIsLoadingA(false); // Set loading to false after fetch error
        console.log(fetchError);
      });
  };

  const urlNg =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nigeria&api-key=fS8iRczRqdTpWgHlGExQsiIeaoUra38f";

  const fetchNgData = () => {
    setIsLoadingB(true); // Set loading to true when starting fetch
    fetch(urlNg)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setDataB(fetchedData);
        setIsLoadingB(false); // Set loading to false after successful fetch
      })
      .catch((fetchError) => {
        setErrorB(fetchError);
        setIsLoadingB(false); // Set loading to false after fetch error
      });
  };

  const searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchValue}&api-key=fS8iRczRqdTpWgHlGExQsiIeaoUra38f`;

  const handleSearchArticle = (e) => {
    e.preventDefault();
    dispatch(updateToggleModal(toggleModalValue));
    dispatch(updateLoadingData(true));
    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        dispatch(updateSearchData(fetchedData));
        dispatch(updateLoadingData(false));
      })
      .catch((fetchError) => {
        dispatch(updateSearchData(fetchError));
        dispatch(updateLoadingData(false));
      });
  };

  useEffect(() => {
    fetchData();
    fetchNgData();
  }, [url, urlNg]);

  const Data = dataA?.results;
  const DataNg = dataB?.response?.docs;

  return (
    <div id="homePage" className="w-full mt-5">
      {dataA && dataB && userName == "" && <GetUserName />}
      <div className="flex justify-center xl:mb-20 ">
        <form
          onSubmit={handleSearchArticle}
          className="flex justify-between fixed z-30 items-center pe-6 xl:pe-5 bg-gray-900/[0.6] hover:bg-gray-900/[1] w-[80vw] xl:w-[40vw] rounded-3xl"
        >
          <input
            autoFocus
            type="text"
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
            name="searchArticle"
            placeholder="Search News Article"
            className="py-3 bg-transparent w-[95%] ps-5 border-none outline-none  "
          />
          <button type="submit" className="text-2xl w-[5%]">
            <BiSearch />
          </button>

          <button disabled="disabled"></button>
        </form>
      </div>
      {!toggleModalValue && <SearchResults />}
      <div className="xl:hidden flex justify-end mx-5 mt-2 relative top-[7vh] xl:top-0  text-sm text-[#F2FC89]">
        <a href="#nigerianNews">Click for Nigerian News</a>
      </div>

      <div className="xl:flex xl:w-full relative top-[7vh] xl:top-0 xl:z-0">
        <div className=" xl:block  xl:w-[50vw]">
          {isLoadingA && <Spinner spinnerText={"Loading..."} />}
          {dataA != null && (
            <>
              {Data.map((data, index) => {
                if (data.abstract != "") {
                  return (
                    <div key={data.short_url}>
                      <Articles
                        articleId={data?.short_url}
                        articleImg={data?.multimedia?.[0]?.url}
                        articleName={data?.des_facet?.[0]}
                        articleTitle={data?.title}
                        articleText={data?.abstract}
                        articleLink={data?.url}
                        articleWriter={data?.byline}
                      />
                    </div>
                  );
                }
              })}
              <a
                href="/#homePage"
                className="fixed text-white/[0.4] w-[10vw] xl:w-[2vw] hover:text-white right-0 bottom-20 xl:z-20 xl:right-[35vw] xl:bottom-10"
              >
                <BsArrowUpCircle className="text-3xl   " />
                <span className="ps-1 text-sm">Top</span>
              </a>
            </>
          )}{" "}
        </div>
        <div
          id="nigerianNews"
          className=" xl:bg-[#0e1421] xl:shadow-lg xl:shadow-gray-800 pt-5 xl:py-5  xl:block xl:w-[30vw] xl:fixed  xl:right-10 xl:h-[100vh] xl:overflow-y-scroll nigerianNews"
        >
          <p className="text-center mb-5 font-bold text-[#F2FC89] text-lg merriWeatherFont">
            Nigerian News
          </p>
          {isLoadingB && <Spinner spinnerText={"Loading..."} />}
          {dataB != null && (
            <>
              {DataNg.map((data, index) => {
                if (data.abstract != "") {
                  return (
                    <div key={data._id}>
                      <Articles
                        articleId={data?._id}
                        articleImg={
                          "https://static01.nyt.com/" +
                          data?.multimedia?.[0]?.url
                        }
                        articleName={data?.source}
                        articleTitle={data?.headline?.main}
                        articleText={data?.lead_paragraph}
                        articleLink={data?.web_url}
                        articleWriter={data?.byline?.original}
                      />
                    </div>
                  );
                }
              })}
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
