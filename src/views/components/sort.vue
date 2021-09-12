<template>
  <div class="sort__by" v-if="lists.length">
    <label class="labl" v-for="(sort, i) in sortTypes" :key="i">
      <input
        type="radio"
        name="sort"
        :checked="sort.value == selectedSort"
        :value="sort.value"
        @change="SET_SORT"
      />
      <div>{{ sort.label }}</div>
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
          label: "Sort by - Default",
        },
        {
          value: "ascending",
          label: "Sort by - Name ( Ascending )",
        },
        {
          value: "descending",
          label: "Sort by - Name ( Descending )",
        },
        {
          value: "created",
          label: "Sort by - Created Time",
        },
      ],
    };
  },
  created() {
    this.SET_FILTERS();
  },
  computed: {
    ...mapState(["lists", "selectedSort"]),
  },
  methods: {
    ...mapMutations(["SET_FILTERS", "SET_SORT"]),
  },
};
</script>
