<template>
  <div class="hello_container">
    <h2 class="hello_message">{{msg}}</h2>
  </div>
</template>

<script>
export default {
  data: {
    msg: 'Hello'
  }
}
</script>

<style>
.hello_container {
  border: 1px solid #00f;
}
.hello_message {
  color: #f00;
}
</style>