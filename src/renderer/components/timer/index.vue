<template>
    <div class="container">
        <timer-work-dial></timer-work-dial>
        <!--<timer-dial></timer-dial>-->
        <!--<timer-settings></timer-settings>-->
        <!--<timer-break-dial></timer-break-dial>-->
    </div>
</template>

<script>
  // import timerSettings from './timer-settings'
  import timerWorkDial from './timer-work-dial'
  // import timerBreakDial from './timer-break-dial'

  export default {
    data() {
      return {
        enableSwitch: true,
        sliderValue: 50,
      }
    },
    components: {
      // timerSettings,
      timerWorkDial,
      // timerBreakDial,
    },
    methods:{

    }
  }
</script>

<style scoped>


    /*.dial-time {*/
    /*border: 1px solid red;*/
    /*padding: 12px;*/
    /*font-size: 50px;*/
    /*!*display: flex;*!*/
    /*!*flex-direction: column;*!*/
    /*}*/

    /**{*/
    /*line-height: 1.15;*/
    /*}*/
</style>
