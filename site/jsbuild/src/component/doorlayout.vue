<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div>left</div>
      </div>
      <div class="col-md-6">
        <div>{{ content }}</div>
      </div>
      <div class="col-md-3">
        <div>right</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showLeft', 'showRight'],
  data () {
    return {
      content: 'ipsum Lorem ipsum dolor'
    }
  }
}
</script>

<style>
</style>