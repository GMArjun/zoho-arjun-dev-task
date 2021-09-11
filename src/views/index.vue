<template>
  <div>
    <Header />
    <ListsViewer />
    <AddList />
    <AddCard />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import ListsViewer from "./components/listViewer.vue";
import AddList from "./components/addList.vue";
import AddCard from "./components/addCard.vue";

export default {
  name: "Home",
  components: {
    Header,
    ListsViewer,
    AddList,
    AddCard,
  },
};
</script>
