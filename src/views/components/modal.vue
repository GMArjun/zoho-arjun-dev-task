<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal__header">
          <slot name="header" />
        </header>
        <section class="modal__body">
          <slot name="body" />
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss"></style>
