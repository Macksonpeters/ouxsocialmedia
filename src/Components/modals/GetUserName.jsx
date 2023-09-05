import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { updateName } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "animate.css";

const GetUserName = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="animate__animated animate__fadeIn animate__delay-2s z-50 fixed">
      <div className="h-screen bg-yellow-100 bg-opacity-60 w-full fixed top-0  flex justify-center items-center xl:left-0 ">
        <div className="bg-gray-900 py-5 px-5 flex justify-center items-center rounded-lg w-[90vw] xl:w-[40vw]">
          <div>
            <p className="text-center">
              Kindly Input A Username For A better Experience
            </p>
            <div className="mt-5 flex justify-center  ">
              <div>
                <input
                  autoFocus
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  className="bg-gray-900 border-b-2 text-white font-semibold tracking-wide capitalize py-2 outline-none Vsmall:w-[70vw] rounded-none"
                />
              </div>
              {userName.length >= 1 && (
                <div className=" transition-transform">
                  <button
                    onClick={() => {
                      if (userName !== "") {
                        dispatch(updateName(userName));
                        navigate("/");
                      }
                    }}
                    type="button"
                    className="text-2xl mt-4 ms-2 "
                  >
                    <BsFillSendFill />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetUserName;
