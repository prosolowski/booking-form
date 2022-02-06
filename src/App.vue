<template>
  <BookingForm />
</template>

<script>
import BookingForm from './components/BookingForm.vue'

export default {
  name: 'App',
  components: {
    BookingForm
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: Montserrat, sans-serif;
  color: #333333;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
