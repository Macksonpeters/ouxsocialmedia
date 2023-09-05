import { Link, NavLink } from "react-router-dom";
import { TbHome2 } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { ImArrowUp2 } from "react-icons/im";

import { Outlet } from "react-router-dom";

const Navigation = () => {
  const userName = useSelector((store) => store.appReducer.name);

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  return (
    <main
      id="navigation"
      className="flex flex-col-reverse xl:flex-row xl:w-full"
    >
      <div className="mt-3 px-5 mb-10 z-50 fixed bottom-0 left-0 right-0 h-[auto] xl:relative xl:w-[15%] xl:h-[100vh]  xl:py-5 xl:my-0">
        <nav className="">
          <div className="flex justify-between xl:flex-col xl:gap-60 xl:fixed">
            <div className="hidden xl:flex w-1/4 text-lg merriWeatherFont text-[#F2FC89] ">
              <Link to={"/"}>
                Ou<span className="text-[#F2FC89]">X</span>Social
              </Link>
            </div>
            <div className="flex fixed bottom-1 justify-evenly left-0 bg-gray-900/[0.6] hover:bg-gray-900/[0.9] xl:hover:bg-transparent xl:static xl:top-0 xl:bottom-0  xl:flex-col  py-3 xl:py-0 xl:bg-transparent xl:justify-center xl:gap-10 w-full ">
              <div>
                <NavLink to="/chat ">
                  <span className="flex gap-2 ">
                    <BsChatSquareText className="text-[#F2FC89] text-[22px] mt-1" />{" "}
                    <span className="hidden text-[17px] xl:flex">Chats</span>
                  </span>
                </NavLink>
              </div>
              <div>
                <NavLink to="/">
                  <span className="flex gap-2">
                    <TbHome2 className="text-[#F2FC89] text-2xl" />{" "}
                    <span className="hidden xl:flex text-[17px]">Home</span>
                  </span>
                </NavLink>
              </div>

              <div>
                <NavLink to="/settings">
                  <span className="flex gap-2">
                    <RiUserSettingsLine className="text-[#F2FC89] text-2xl" />{" "}
                    <span className="hidden text-[17px] xl:flex">Settings</span>
                  </span>
                </NavLink>
              </div>
            </div>
            <div className="hidden xl:flex justify-end pe-5 xl:pe-0 xl:justify-start">
              <p className="text-[17px] capitalize">
                {(currentHour < 12 && <span>Good Morning</span>) ||
                  (currentHour >= 12 && currentHour < 18 ? (
                    <span>Good Afternoon</span>
                  ) : (
                    <span>Good Evening</span>
                  ))}{" "}
                {userName}
              </p>
            </div>
          </div>
        </nav>
      </div>
      <main className="xl:w-[80%]">
        <Outlet />
      </main>
    </main>
  );
};

export default Navigation;
