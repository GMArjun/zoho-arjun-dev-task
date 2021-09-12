<template>
  <main>
    <Sort />
    <div class="over-flow">
      <div class="lists_container" v-if="filteredLists.length">
        <template v-for="(list, i) in filteredLists">
          <div class="list" :key="i">
            <div class="list__header">
              <div class="list__header-title">
                {{ list.title }}
              </div>
              <div class="list__header-card-count">
                {{ (list.cards && list.cards.length) || 0 }}
              </div>
              <button @click="DELETE_LIST(i)" class="list__header-delete-btn">
                <img src="@/assets/bin1.png" alt="delete-ico" />
              </button>
            </div>
            <div class="list__body">
              <template v-if="list.cards && list.cards.length">
                <div
                  class="list__body-card"
                  v-for="(card, j) in list.cards"
                  :key="j"
                >
                  <div class="list__body-card-header">
                    <div class="list__body-card-header-title">
                      {{ card.title }}
                    </div>

                    <div class="favourites">
                      <input
                        :id="`fav+${card.createdAt}`"
                        type="checkbox"
                        :checked="card.isFavourite"
                        @input="
                          TOGGLE_FAVOURITE({
                            event: $event,
                            listIndex: i,
                            cardCreatedAt: card.createdAt,
                          })
                        "
                      />
                      <label
                        class="fav-star"
                        :for="`fav+${card.createdAt}`"
                      ></label>
                    </div>
                    <button
                      class="card-delete"
                      @click="
                        DELETE_CARD({
                          listIndex: i,
                          cardCreatedAt: card.createdAt,
                        })
                      "
                    >
                      <img
                        height="19"
                        src="@/assets/bin1.png"
                        alt="delete-ico"
                      />
                    </button>
                  </div>
                  <div
                    class="list__body-card-description"
                    v-if="card.description"
                  >
                    {{ card.description }}
                  </div>
                </div>
              </template>
              <div class="empty-placeholder" v-else>No Cards available</div>
            </div>
            <div class="list__footer">
              <button
                class="list__footer-add-btn"
                @click="TOGGLE_CARD_MODAL({ visibility: true, index: i })"
              >
                + Add Card
              </button>
            </div>
          </div>
        </template>
      </div>
      <div class="empty-placeholder" v-else>No list available</div>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Sort from "./sort.vue";

export default {
  name: "Home",
  components: { Sort },
  computed: {
    ...mapState(["filteredLists"]),
  },
  methods: {
    ...mapMutations([
      "TOGGLE_CARD_MODAL",
      "DELETE_LIST",
      "TOGGLE_FAVOURITE",
      "DELETE_CARD",
    ]),
  },
};
</script>
