<template>
    <div id="app">
        <!--<timer></timer>-->
        <router-view></router-view>
    </div>
</template>

<script>
  import Timer from './components/timer'

  export default {
    name: 'breaktime',
    components: {
      Timer,
    }
  }
</script>

<style>
    /* CSS */
</style>
