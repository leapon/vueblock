<template>
  <div class="hello_container">
    <h2 class="hello_message">Hello {{ name }}</h2>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style>
.hello_container {
  border: 1px solid #00f;
}
.hello_message {
  color: #00f;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>