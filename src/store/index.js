import Vue from "vue";
import Vuex from "vuex";
const moment = require("moment");

import {
  ADD_LIST,
  DELETE_LIST,
  ADD_CARD,
  DELETE_CARD,
  UPDATE_LIST_TITLE,
  UPDATE_CARD_TITLE,
  UPDATE_CARD_DESCRIPTION,
  TOGGLE_LIST_MODAL,
  TOGGLE_CARD_MODAL,
  TOGGLE_FAVOURITE,
  SET_FILTERS,
  SET_SEARCH_KEYWORD,
  SET_SORT,
  UPDATE_LIST,
} from "./mutations.type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: JSON.parse(localStorage.getItem("lists")) || [],
    filteredLists: [],
    selectedSort: localStorage.getItem("sortType") || "default",
    enteredSearchStr: "",
    enteredListTitle: "",
    enteredCardTitle: "",
    enteredCardDescription: "",
    isFavourite: false,
    formErr: false,
    selectedListIndex: null,
    listModalShow: false,
    cardModalShow: false,
  },
  mutations: {
    [TOGGLE_LIST_MODAL](state, visibility) {
      state.listModalShow = visibility;
      state.formErr = "";
    },
    [TOGGLE_CARD_MODAL](state, { visibility, index }) {
      state.selectedListIndex = index;
      state.cardModalShow = visibility;
      state.formErr = "";
    },
    [UPDATE_LIST_TITLE](state, event) {
      state.enteredListTitle = event.target.value.trim();
    },
    [ADD_LIST](state) {
      state.formErr = "";
      let scrollContainer = document.getElementById("horizontal-scroll");
      let isEmpty = !state.enteredListTitle;

      let isValid =
        !isEmpty &&
        !state.lists.some(
          (i) => i.title.toLowerCase() == state.enteredListTitle.toLowerCase()
        );

      if (!isEmpty) {
        if (isValid) {
          state.lists.push({
            createdAt: moment(new Date()).format("DD/MM/YYYY mm:ss"),
            title: state.enteredListTitle,
            cards: [],
          });
          state.enteredListTitle = "";
          state.listModalShow = false;
          setTimeout(function () {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth;
          }, 100);
        } else {
          state.formErr = "List title already exist, It should be unique";
        }
      } else {
        state.formErr = "List title is required";
      }
    },
    [DELETE_LIST](state, index) {
      state.lists.splice(index, 1);
    },
    [UPDATE_CARD_TITLE](state, event) {
      state.enteredCardTitle = event.target.value.trim();
    },
    [UPDATE_CARD_DESCRIPTION](state, event) {
      state.enteredCardDescription = event.target.value.trim();
    },
    [ADD_CARD](state) {
      state.formErr = "";
      let isEmpty = !state.enteredCardTitle;
      if (!isEmpty) {
        state.lists[state.selectedListIndex].cards.unshift({
          createdAt: moment(new Date()).format("DD/MM/YYYY mm:ss"),
          title: state.enteredCardTitle,
          description: state.enteredCardDescription,
          isFavourite: state.isFavourite,
        });
        state.enteredCardTitle = "";
        state.enteredCardDescription = "";
        state.cardModalShow = false;
      } else {
        state.formErr = "Card title is required";
      }
    },
    [DELETE_CARD](state, { listIndex, cardCreatedAt }) {
      state.lists[listIndex].cards = state.lists[listIndex].cards.filter(
        (i) => i.createdAt !== cardCreatedAt
      );
    },
    [TOGGLE_FAVOURITE](state, { event, listIndex, cardCreatedAt }) {
      let card = state.lists[listIndex].cards.filter(
        (i) => i.createdAt == cardCreatedAt
      )[0];
      card.isFavourite = event.target.checked;
    },
    [SET_SEARCH_KEYWORD](state, e) {
      state.enteredSearchStr = e.target.value.trim();
      this.commit("SET_FILTERS");
    },
    [SET_SORT](state, e) {
      state.selectedSort = e.target.value;
      localStorage.setItem("sortType", state.selectedSort);
      this.commit("SET_FILTERS");
    },
    [SET_FILTERS](state) {
      let sortable = JSON.parse(JSON.stringify(state.lists));

      sortable.forEach((list) => {
        switch (state.selectedSort) {
          case "ascending":
            list.cards = list.cards.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
            break;
          case "descending":
            list.cards = list.cards.sort((a, b) =>
              b.title.localeCompare(a.title)
            );
            break;
          case "created":
            list.cards = list.cards.sort((a, b) =>
              moment(b.createdAt, "DD/MM/YYYY mm:ss").diff(
                moment(a.createdAt, "DD/MM/YYYY mm:ss")
              )
            );
            break;
          case "default":
            break;
        }
      });

      if (state.enteredSearchStr) {
        let searchStr = state.enteredSearchStr.toLowerCase();

        sortable = sortable
          .filter((element) => {
            return (element.cards = element.cards.filter(
              (i) =>
                i.title.toLowerCase().includes(searchStr) ||
                i.description.toLowerCase().includes(searchStr)
            ));
          })
          .filter((element) => element.cards.length);
      }

      state.filteredLists = sortable;
    },
    [UPDATE_LIST](state, payload) {
      state.lists = payload;
    },
  },
  actions: {},
  modules: {},
});
