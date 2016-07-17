<template>
  <div class="time_container">
    <h2 class="time_message">{{ displayTime }}</h2>
  </div>
</template>

<script>
import moment from 'moment';
import moment_timezone from 'moment-timezone';

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
    self.timezone = self.timezone || 'America/New_York'; // default to New York
    self.displayTime = moment().tz(self.timezone).format('hh:mm:ss A z');
    setInterval(function() {
      self.displayTime = moment().tz(self.timezone).format('hh:mm:ss A z');
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