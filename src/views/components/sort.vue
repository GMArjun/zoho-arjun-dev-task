<template>
  <div class="sort__by" v-if="isCardsAvailable">
    <label class="labl" v-for="(sort, i) in sortTypes" :key="i">
      <input
        type="radio"
        name="sort"
        :checked="sort.value == selectedSort"
        :value="sort.value"
        @change="SET_SORT"
      />
      <div><span>Sort by - </span>{{ sort.label }}</div>
    </label>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Sort",
  data() {
    return {
      sortTypes: [
        {
          value: "default",
          label: "Default",
        },
        {
          value: "ascending",
          label: "Name ( Ascending )",
        },
        {
          value: "descending",
          label: "Name ( Descending )",
        },
        {
          value: "created",
          label: "Created Time",
        },
      ],
    };
  },
  created() {
    this.SET_FILTERS();
  },
  computed: {
    ...mapState(["lists", "selectedSort"]),
    isCardsAvailable() {
      return this.lists.some((i) => i.cards.length);
    },
  },
  watch: {
    "$store.state.lists": {
      handler() {
        localStorage.setItem("lists", JSON.stringify(this.lists));
        this.SET_FILTERS();
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["SET_FILTERS", "SET_SORT"]),
  },
};
</script>
