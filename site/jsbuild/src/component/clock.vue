<template>
  <div class="time_container">
    <h2 class="time_message">{{ displayTime }} ({{ timezone }})</h2>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['timezone'],
  data () {
    return {
      displayTime: ''
    }
  },
  activate: function(done) {
    console.log('in activate');
    var self = this;
    self.displayTime = moment().format('HH:mm:ss');
    setInterval(function() {
      self.displayTime = moment().format('HH:mm:ss');
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