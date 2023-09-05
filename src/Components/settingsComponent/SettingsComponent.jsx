import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { updateName } from "../../redux/slice";
import { useNavigate } from "react-router-dom";

const SettingsComponent = () => {
  const userName = useSelector((store) => store.appReducer.name);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayPic =
    "https://img.freepik.com/free-photo/3d-cartoon-lumberjack-character_1048-18378.jpg?w=740&t=st=1693388496~exp=1693389096~hmac=2e6824be05561603661aea2746ce2e303b1f332bfd3660d3d7f4b8ec799d8d9e";

  return (
    <div className="mx-5 xl:w-full">
      <div className="">
        <p className="font-bold mt-5 text-xl  xl:text-3xl">My Account</p>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-10 flex gap-4 justify-center items-center">
            <div>
              <img
                style={{ maxWidth: "15vw", height: "auto" }}
                src={displayPic}
                alt=""
                className="w-full  xl:w-[9vw] object-cover xl:object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-lg xl:text-2xl font-semibold">{userName}</p>
            </div>
          </div>

          <div className="w-[90vw] px-5 py-5 h-auto xl:w-[50vw] rounded-lg bg-gray-900 mt-5">
            <div className="flex justify-between py-5">
              <p>
                <span className="text-sm xl:text-base text-[#787878] tracking-wider font-semibold">
                  Display Name:
                </span>
                <span className="block xl:text-lg">{userName}</span>
              </p>
              <button
                onClick={() => {
                  setEditName(!editName);
                }}
                className=" bg-[#F2FC89] text-gray-900 font-semibold tracking-wider my-[1rem] py-1 px-5 rounded-lg"
              >
                Edit
              </button>
            </div>
            {editName && (
              <div className="flex">
                <div>
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="bg-gray-900 border-b border-yellow-100 text-white font-semibold tracking-wide capitalize py-2 outline-none Vsmall:w-[70vw]"
                  />
                </div>
                {name.length >= 1 && (
                  <div className=" transition-transform">
                    <button
                      onClick={() => {
                        if (name !== "") {
                          dispatch(updateName(name));
                        }
                        setEditName(!editName);
                      }}
                      type="button"
                      className="text-lg mt-6 xl:text-2xl xl:mt-4 "
                    >
                      <BsFillSendFill className="text-yellow-100" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="my-10">
            <button
              className="px-5 bg-[#f2fc89] text-gray-900 font-semibold tracking-wider rounded-lg py-2 xl:text-lg"
              type="button"
              onClick={() => {
                dispatch(updateName(""));
                localStorage.clear();
                navigate("/");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
