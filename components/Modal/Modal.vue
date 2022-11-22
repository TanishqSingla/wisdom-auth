<template>
  <div class="h-full w-full top-0 left-0 fixed bg-[#212121]/50 grid place-items-center" v-show="isVisible"
    @click="$emit('closeModal')">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="title"></slot>
        <button @click="$emit('closeModal')">
          <img src="~/assets/svgs/close-button.svg" />
        </button>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      isVisible: true,
    };
  },
};
</script>

<script setup></script>
