<template>
  <div class="list__body-card">
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
              listIndex: listIndex,
              cardCreatedAt: card.createdAt,
            })
          "
        />
        <label class="fav-star" :for="`fav+${card.createdAt}`"></label>
      </div>
      <button
        class="card-delete"
        @click="
          DELETE_CARD({
            listIndex: listIndex,
            cardCreatedAt: card.createdAt,
          })
        "
      >
        <img height="19" src="@/assets/bin1.png" alt="delete-ico" />
      </button>
    </div>
    <div class="list__body-card-description" v-if="card.description">
      {{ card.description }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["card", "listIndex"],
  methods: {
    ...mapMutations(["TOGGLE_FAVOURITE", "DELETE_CARD"]),
  },
};
</script>
