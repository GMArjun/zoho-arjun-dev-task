<template>
  <div class="list__footer">
    <button
      class="list__footer-add-btn"
      @click="TOGGLE_CARD_MODAL({ visibility: true, index: index })"
    >
      + Add Card
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["index"],
  methods: {
    ...mapMutations(["TOGGLE_CARD_MODAL"]),
  },
};
</script>
