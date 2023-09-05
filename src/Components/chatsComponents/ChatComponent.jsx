import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { addChatName } from "../../redux/slice";
import GetUserName from "../modals/GetUserName";
import ChatMessages from "./ChatMessages";

const ChatComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [newChat, setNewChat] = useState("");
  const [generatedChatName, setGeneratedChatName] = useState("");
  const [createChat, setCreateChat] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const userName = useSelector((store) => store.appReducer.name);
  const chats = useSelector((store) => store.appReducer.chatName);
  const dispatch = useDispatch();

  const messagesRef = collection(db, "messages");

  const handleChatCreation = () => {
    // const id = Math.floor(Math.random() * 900) + 100;
    setCreateChat(!createChat);
    setChatActive(true);
    // dispatch(addChatName({ Id: id, chatname: newChat }));
  };

  function fetchMessages() {
    let searchChatName = newChat.toLowerCase();
    const queryMessages = query(
      messagesRef,
      where("chatName", "==", searchChatName),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (QuerySnapshot) => {
      let arrayMessages = [];
      QuerySnapshot.forEach((doc) => {
        // console.log("Current data: ", doc.data(), doc.id);
        arrayMessages.push({ ...doc.data(), id: doc.id });
      });
      setAllMessages(arrayMessages);
    });

    return () => unsubscribe();
  }

  useEffect(() => {
    fetchMessages();
  }, [newChat]);

  //   useEffect(() => {
  //     const getMessages = async () => {
  //       const queryMessages = query(
  //         messagesRef,
  //         where("chatName", "==", "david"),
  //         orderBy("createdAt")
  //       );
  //       const messagesData = await getDocs(queryMessages);
  //       const filteredData = messagesData.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setAllMessages(filteredData);
  //     };

  //     getMessages();
  //   }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      await addDoc(messagesRef, {
        name: userName,
        text: newMessage,
        createdAt: serverTimestamp(),
        chatName: newChat.toLowerCase(),
      });
      setNewMessage("");
      //   setNewChat("");
    } else {
      return alert("error");
    }
  };

  const generateChatName = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    setGeneratedChatName(randomNum.toString());
  };

  return (
    <div className="h-[100vh] w-full ">
      {userName == "" && <GetUserName />}
      <div className="flex flex-col xl:flex-row gap-2 h-full">
        <div className="xl:w-[25%] py-5 px-5 bg-[#787c50] text-gray-900 font-semibold capitalize tracking-wider">
          <div>
            <p>chat</p>
            <div className="mt-5 flex justify-between vsmall:text-sm msmall:text-sm">
              <span>Create new chat </span>
              <span
                onClick={() => {
                  setCreateChat(!createChat);
                }}
                className="cursor-pointer"
              >
                <IoMdAdd className="text-2xl vsmall:text-xl msmall:text-xl" />
              </span>
            </div>
            {createChat && (
              <div>
                <p className="text-[11px] mt-2">
                  To chat is simple. generate chat code, input it and send it to
                  your friend to input same code and you're good to go
                </p>
                <p
                  onClick={generateChatName}
                  className="capitalize cursor-pointer text-sm w-max bg-gray-950 rounded-lg py-1 px-3 mt-3 text-[#787c50]"
                >
                  Click to generate Chat code
                </p>
                <p className="capitalize cursor-pointer text-sm  rounded-lg mt-3 ">
                  {generatedChatName.length > 0 && (
                    <span>{generatedChatName}</span>
                  )}
                </p>
                <input
                  autoFocus
                  type="text"
                  value={newChat}
                  name="chatName"
                  onChange={(e) => setNewChat(e.target.value)}
                  placeholder="input chat code"
                  className="bg-transparent py-2 capitalize outline-none font-normal text-gray-900 border-b-2 border-gray-900 mt-3"
                />
                {newChat.length >= 7 && (
                  <button
                    type="submit"
                    onClick={handleChatCreation}
                    className=" py-2 outline-none font-normal text-gray-300 border-b-2 border-gray-900 mt-3"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {chatActive && (
          <div className="xl:w-[75%] flex flex-col gap-7 h-[100vh] overflow-y-scroll text-[#F2FC89] p-5">
            <div className="">
              {/* {allMessages !== [] && ( */}
              <div className="pb-5 capitalize text-center font-bold text-lg msmall:text-base">
                Chat code : {newChat}
              </div>

              <div className="h-[60vh] vsmall:h-[50vh] msmall:h-[50vh] lg:h-[70vh] overflow-y-scroll">
                {allMessages != [] && (
                  <>
                    {allMessages.map((message) => {
                      return (
                        <div key={message.id}>
                          <ChatMessages
                            userName={message.name}
                            message={message.text}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              {/* )} */}
            </div>
            <div>
              <form onSubmit={handleSendMessage} action="">
                <div className="mt-5 flex justify-center items-center fixed bottom-20 xl:bottom-10 right-[10%] ">
                  <input
                    value={newMessage}
                    name="newMessage"
                    type="text"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    className="bg-gray-900/[0.7] hover:bg-gray-900/[1] border-b-2 text-white w-[70vw] xl:w-[40vw] font-semibold tracking-wide capitalize py-2 outline-none Vsmall:w-[70vw] rounded-none"
                  />

                  <button
                    type="submit"
                    className="text-2xl mt-4 ms-2 vsmall:text-xl msmall:text-xl"
                  >
                    <BsFillSendFill />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
