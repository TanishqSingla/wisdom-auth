<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  components: {
    Header
  }
}
</script>

<template>
  <Header />
  <slot name="children">Fallback</slot>
  <Footer />
</template>