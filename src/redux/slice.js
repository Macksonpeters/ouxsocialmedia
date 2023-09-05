import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  toggleModal: true,
  loadingData: false,
  comments: {},
  chatName: {},
  searchData: null,
};

const applicationSlice = createSlice({
  name: "ApplicationSlice",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateToggleModal: (state, action) => {
      state.toggleModal = !action.payload;
    },
    updateLoadingData: (state, action) => {
      state.loadingData = action.payload;
    },
    addComments: (state, action) => {
      //   state.comments.data = [...state.comments.data, action.payload];
      const { articleId, comment } = action.payload;
      if (!state.comments[articleId]) {
        state.comments[articleId] = [];
      }
      state.comments[articleId].push(comment);
    },
    addChatName: (state, action) => {
      const { Id, chatname } = action.payload;

      if (!state.chatName[Id]) {
        state.chatName[Id] = [];
      }
      state.chatName[Id].push(chatname);
    },
    updateSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const {
  updateName,
  addComments,
  addChatName,
  updateSearchData,
  updateLoadingData,
  updateToggleModal,
} = applicationSlice.actions;

export default applicationSlice.reducer;
