<template>
  <header>
    <nav class="nav">
      <div class="nav__header">To-Do List</div>
      <div class="nav__search">
        <input
          type="text"
          placeholder="Search"
          class="nav__search_bar"
          @input="SET_SEARCH_KEYWORD"
        />
      </div>
      <button class="nav__addlist-btn" @click="TOGGLE_LIST_MODAL(true)">
        Add List
      </button>
    </nav>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapMutations(["TOGGLE_LIST_MODAL", "SET_SEARCH_KEYWORD"]),
  },
};
</script>
