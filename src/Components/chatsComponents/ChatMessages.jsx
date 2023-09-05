import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ChatMessages = ({ userName, message }) => {
  const active_userName = useSelector((store) => store.appReducer.name);

  return (
    <div className="">
      <div>
        {" "}
        <div className=" mt-3 capitalize rounded-lg vsmall:text-[13px]">
          {userName == active_userName ? (
            <div className="flex justify-end">
              <p className="bg-gray-900 py-2 px-4 rounded-lg">
                <span className="font-semibold text-gray-400">
                  {userName} {""}:
                </span>
                <span className="ms-3 ">{message}</span>
              </p>
            </div>
          ) : (
            <div className="flex justify-start">
              {" "}
              <p className="bg-gray-900 py-2 px-4 rounded-lg">
                <span className="font-semibold text-gray-400">
                  {userName} {""}:
                </span>
                <span className="ms-3 ">{message}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
