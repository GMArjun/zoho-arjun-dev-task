<template>
  <div class="list__header">
    <div class="list__header-title">{{ title }}</div>
    <div class="list__header-card-count">
      {{ (cards && cards.length) || 0 }}
    </div>
    <button @click="DELETE_LIST(index)" class="list__header-delete-btn">
      <img src="@/assets/bin1.png" alt="delete-ico" />
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["title", "cards", "index"],
  methods: {
    ...mapMutations(["DELETE_LIST"]),
  },
};
</script>
