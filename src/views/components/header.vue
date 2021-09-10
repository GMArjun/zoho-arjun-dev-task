<template>
  <header>
    <nav class="nav">
      <div class="nav__header">To-Do List</div>
      <div class="nav__search">
        <input type="text" placeholder="Search" class="nav__search_bar" />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0px;
  box-shadow: 0px 0px 60px 0px #f3f3f3;
  .nav {
    max-width: 1260px;
    margin: 0 auto;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 20px;
    &__header {
      font-weight: 700;
      font-size: 22px;
    }
    &__search {
      &_bar {
        background-image: url("../../assets/search.png");
        background-repeat: no-repeat;
        background-position: 10px 8px;
        background-color: #f3f3f3;
        padding: 12px 12px 12px 36px;
        border-radius: 30px;
        outline: none;
        border: none;
        font-size: 16px;
        min-width: 235px;
        &::placeholder {
          color: #aeaeae;
          opacity: 1;
        }
      }
    }
  }
}
</style>
