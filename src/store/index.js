import Vue from "vue";
import Vuex from "vuex";

const ADD_LIST = "ADD_LIST";
const DELETE_LIST = "DELETE_LIST";
const ADD_CARD = "ADD_CARD";
const DELETE_CARD = "DELETE_CARD";
const UPDATE_LIST_TITLE = "UPDATE_LIST_TITLE";
const UPDATE_CARD_TITLE = "UPDATE_CARD_TITLE";
const UPDATE_CARD_DESCRIPTION = "UPDATE_CARD_DESCRIPTION";
const TOGGLE_LIST_MODAL = "TOGGLE_LIST_MODAL";
const TOGGLE_CARD_MODAL = "TOGGLE_CARD_MODAL";
const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
const SET_FILTERS = "SET_FILTERS";
const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";
const SET_SORT = "SET_SORT";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: JSON.parse(localStorage.getItem("lists")) || [],
    sortedLists: [],
    selectedSort: "default",
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
      let isEmpty = !state.enteredListTitle;

      let isValid =
        !isEmpty &&
        !state.lists.some(
          (i) => i.title.toLowerCase() == state.enteredListTitle.toLowerCase()
        );

      if (!isEmpty) {
        if (isValid) {
          state.lists.push({
            createdAt: new Date(),
            title: state.enteredListTitle,
            cards: [],
          });
          localStorage.setItem("lists", JSON.stringify(state.lists));
          state.enteredListTitle = "";
          state.listModalShow = false;
        } else {
          state.formErr = "List title already exist, It should be unique";
        }
      } else {
        state.formErr = "List title is required";
      }
    },
    [DELETE_LIST](state, index) {
      state.lists.splice(index, 1);
      localStorage.setItem("lists", JSON.stringify(state.lists));
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
          createdAt: new Date(),
          title: state.enteredCardTitle,
          description: state.enteredCardDescription,
          isFavourite: state.isFavourite,
        });
        localStorage.setItem("lists", JSON.stringify(state.lists));
        state.enteredCardTitle = "";
        state.enteredCardDescription = "";
        state.cardModalShow = false;
      } else {
        state.formErr = "Card title is required";
      }
    },
    [DELETE_CARD](state, { listIndex, cardIndex }) {
      state.lists[listIndex].cards.splice(cardIndex, 1);
      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    [TOGGLE_FAVOURITE](state, { event, listIndex, cardIndex }) {
      state.lists[listIndex].cards[cardIndex].isFavourite =
        event.target.checked;
      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    [SET_SEARCH_KEYWORD](state, e) {
      state.enteredSearchStr = e.target.value.trim();
      this.commit("SET_FILTERS");
    },
    [SET_SORT](state, e) {
      state.selectedSort = e.target.value;
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
            list.cards = list.cards.sort((a, b) => b.createdAt - a.createdAt);
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

      state.sortedLists = sortable;
    },
  },
  actions: {},
  modules: {},
});
