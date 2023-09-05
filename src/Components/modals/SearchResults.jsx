import React from "react";
import Articles from "../Articles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../spinner/Spinner";
import { MdClose } from "react-icons/md";
import {
  updateLoadingData,
  updateSearchData,
  updateToggleModal,
} from "../../redux/slice";

const SearchResults = () => {
  const loadingData = useSelector((store) => store.appReducer.loadingData);
  const toggleModal = useSelector((store) => store.appReducer.toggleModal);
  const searchResults = useSelector((store) => store.appReducer.searchData);

  const dispatch = useDispatch();
  const [dataA, setDataA] = useState(null);
  const [isLoadingA, setIsLoadingA] = useState(true); // Initialize as true

  const finalSearchData = searchResults?.response?.docs;

  return (
    <div className="z-50 fixed overflow-y-scroll">
      <div className="h-screen bg-yellow-100 bg-opacity-60 w-full fixed top-0  flex justify-center items-center xl:left-0 ">
        <div className="bg-gray-900 h-[100vh] top-2 relative py-5 px-5 flex flex-wrap justify-center items-center rounded-lg overflow-y-scroll w-[90vw] xl:w-[50vw]">
          <div className="flex justify-end items-end cursor-pointer w-full">
            <MdClose
              onClick={() => {
                dispatch(updateToggleModal(toggleModal));
                let newSearchData = null;
                dispatch(updateSearchData(newSearchData));
                dispatch(updateLoadingData(false));
              }}
              className="text-2xl font-extrabold msmall:text-xl vsmall:text-xl"
            />
          </div>

          <div>
            {" "}
            {loadingData === true && <Spinner spinnerText={"Loading..."} />}
          </div>
          <div className="mt-0">
            {searchResults !== null && (
              <>
                {finalSearchData.map((data, index) => {
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
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
