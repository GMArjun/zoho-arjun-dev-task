<template>
  <main>
    <Sort />

    <div
      class="over-flow"
      :class="{ heightfix: heightAdjust, heightAuto: !filteredLists.length }"
      id="horizontal-scroll"
    >
      <div class="lists_container" v-if="filteredLists.length">
        <template v-for="(list, i) in filteredLists">
          <div class="list" :key="i">
            <Header :title="list.title" :cards="list.cards" :index="i" />

            <draggable
              class="list__body"
              :list="list.cards"
              @change="log"
              group="people"
              :move="checkMove"
            >
              <template v-if="list.cards && list.cards.length">
                <Card
                  v-for="(card, j) in list.cards"
                  :card="card"
                  :listIndex="i"
                  :key="j"
                />
              </template>
              <div class="empty-placeholder" v-else>No Cards available</div>
            </draggable>

            <Footer :index="i" />
          </div>
        </template>
      </div>
      <div class="empty-placeholder" v-else>No list available</div>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import draggable from "vuedraggable";
import Sort from "../sort.vue";
import Header from "./header.vue";
import Footer from "./footer.vue";
import Card from "./card.vue";

export default {
  name: "Home",
  components: { Sort, draggable, Header, Footer, Card },
  computed: {
    ...mapState(["filteredLists", "enteredSearchStr"]),
    heightAdjust() {
      return this.filteredLists.some((i) => i.cards && i.cards.length);
    },
  },
  methods: {
    ...mapMutations(["UPDATE_LIST"]),
    log() {
      this.UPDATE_LIST(this.filteredLists);
    },
    checkMove() {
      if (this.enteredSearchStr) return false;
    },
  },
};
</script>
