<template>
  <div class="time_container">
    <h2 class="time_message">{{ displayTime }} ({{ timezone }})</h2>
  </div>
</template>

<script>
export default {
  props: ['timezone'],
  /*
  data: {
    currentTime: Date()
  },
  */
  computed: {
    displayTime: function() {

      return "11:22:33";
    }
  },
  activate: function(done) {
    console.log('in activate');
    setInterval(function() {
      console.log('in time interval')
    }, 1000);
    done();
  }
}
</script>

<style>
.time_container {
  border: 1px solid #00f;
}
.time_message {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>