<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal">
      <div class="teleport-modal__content">
        <button type="button" class="teleport-modal__close">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.teleport-blackout {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: black;
}
.teleport-modal {
  z-index: 1010;
  overflow: auto;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.teleport-modal__content {
  position: relative;
  max-width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  padding: 40px;
  background-color: white;
}
.teleport-modal__close {
  position: absolute;
  top: -1.25em;
  right: -1.25em;
  padding: 10px;
  line-height: 1;
}
</style>
