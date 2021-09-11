<template>
  <Modal v-if="cardModalShow">
    <template v-slot:header> Add Card </template>
    <template v-slot:body>
      <label>Title</label>
      <input
        type="text"
        placeholder="list title"
        @input="UPDATE_CARD_TITLE($event)"
      />
      <div class="err" v-if="formErr">{{ formErr }}</div>
      <label>Description</label>
      <textarea
        type="text"
        rows="4"
        placeholder="list Description"
        @input="UPDATE_CARD_DESCRIPTION($event)"
      />
      <div class="actions">
        <button @click="TOGGLE_CARD_MODAL(false)">Cancel</button>
        <button @click="ADD_CARD">Add</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Modal from "./modal.vue";

export default {
  name: "Home",
  computed: {
    ...mapState(["cardModalShow", "formErr"]),
  },
  methods: {
    ...mapMutations([
      "TOGGLE_CARD_MODAL",
      "UPDATE_CARD_TITLE",
      "UPDATE_CARD_DESCRIPTION",
      "ADD_CARD",
    ]),
  },
  components: {
    Modal,
  },
};
</script>
