<template>
  <div id="app">
    <ContactForm />
    <SubmitModal />
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue'
import SubmitModal from './components/SubmitModal.vue'

export default {
  name: 'App',
  components: {
    ContactForm,
    SubmitModal,
  }
}
</script>

<style lang="scss">
body {
  background: linear-gradient( -45deg, $eigengrau, $charcoal );
  color: $white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  min-height: 100vh;
}
</style>
