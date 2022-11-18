<template>
  <div class="h-full w-full top-0 left-0 fixed grid place-items-center bg-[#212121]/50" v-show="isVisible" @click="$emit('closeModal')">
    <slot name="children"></slot> 
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      visible: Boolean
    },
    data() {
      return{
        isVisible: true
      }
    },
  }
</script>

<script setup>
</script>