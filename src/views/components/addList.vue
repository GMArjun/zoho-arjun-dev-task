<template>
  <div>
    <Modal v-if="listModalShow">
      <template v-slot:header> Add List </template>
      <template v-slot:body>
        <label>Title</label>
        <input
          type="text"
          placeholder="List title"
          @input="UPDATE_LIST_TITLE($event)"
        />
        <div class="err" v-if="formErr">{{ formErr }}</div>
        <div class="actions">
          <button @click="TOGGLE_LIST_MODAL(false)">Cancel</button>
          <button @click="ADD_LIST">Add</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Modal from "./modal.vue";

export default {
  name: "Home",
  data() {
    return {
      listTitle: "",
    };
  },
  computed: {
    ...mapState(["listModalShow", "formErr"]),
  },
  methods: {
    ...mapMutations(["TOGGLE_LIST_MODAL", "ADD_LIST", "UPDATE_LIST_TITLE"]),
  },
  components: {
    Modal,
  },
};
</script>
