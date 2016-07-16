<template>
  <div class="time_container">
    <h2 class="time_message">xx:yy:zz ({{ timezone }})</h2>
  </div>
</template>

<script>
export default {
  props: ['timezone']
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