<script>
import Agenda from './components/Agenda.vue'
export default {
  name: 'app',
  components: {
    Agenda
  }
}
</script>

<template>
  <div id="calendar-container">
    <Agenda />
  </div>
</template>

<style scoped>

#calendar-container{
  margin: 0 auto;
  width: 75vw;
  padding: 0 2rem;
  height: 100%;
  border: solid 1px rgb(33, 42, 54);
  border-radius: 15px;
}

</style>
