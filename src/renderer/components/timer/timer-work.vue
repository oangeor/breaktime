<template>
    <div class="container">
        <div class="arrow-up"></div>

        <div class="content-container">
            <el-row type="flex" align="middle">
                <el-col :span="8">
                    <p class="dial-time"> {{timeRemaining}} </p>
                </el-col>

                <el-col :span="16">
                    <el-row type="flex" align="middle">
                        <el-col :span="18" style="font-size: 16px;padding: 1px">{{timeUnit}} until break</el-col>
                        <el-col :span="6" class="switch">
                            <el-switch v-model='switchValue' @change="switchChange"/>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="20" style="padding-right: 10px">
                            <el-slider v-model="sliderValue" :max="sliderMax" @change="sliderChange"></el-slider>
                        </el-col>
                        <el-col :span="4" class="settings" style="padding: 8px"><i class="el-icon-setting"
                                                                                   @click="settingsClick"></i>
                        </el-col>

                    </el-row>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
  import Timer from '../../utils/timer'
  import {EventBus} from "../../utils/event-bus";

  export default {
    props: ['delayMins'],
    data() {
      return {
        timer: null,
        timeUnit: 'minutes',
        sliderValue: 100,
        timeInt: null,
        switchValue: true,
      }
    },
    created() {
      this.initTimer();
    },
    mounted() {
      this.switchValue = this.$store.getters.mainSwitch;
      this.listenChange()
    },
    watch: {
      sliderValue() {
        console.log(this.sliderValue)
        if (this.timeInt) {
          clearInterval(this.timerInt);
        }
        if (this.sliderValue >= 60) {
          this.timeUnit = "minutes"
        } else {
          this.timeUnit = "seconds"
        }
        this.timer.resetElapsedTime(this.sliderValue)
      }
    },
    computed: {
      mainSwitch() {
        return this.$store.getters.mainSwitch
      },

      timeRemainingSeconds() {
        let remainingSeconds = this.timer.getRemainingSeconds()
        return remainingSeconds;
      },

      timeRemaining() {
        console.log("this timer")
        console.log(this.timer)
        const {remainingMinutes, remainingSeconds} = this.timer.getRemaining(this.workMinutes);
        if (remainingMinutes <= 0) {
          this.timeUnit = 'seconds';
          return this.formatTime(remainingSeconds)
        }
        return this.formatTime(remainingMinutes)
      },

      sliderMax() {
        console.log("workminutes: " + this.workMinutes * 60)
        return this.workMinutes * 60;
      },

      workMinutes() {
        return this.$store.getters.timeWork;
      }
    },
    methods: {
      switchChange(val) {
        this.$store.dispatch('setMainSwitch', val);
        if (val === true) {
          this.initTimer()
        } else {
          this.pauseTimer()
        }
      },
      listenChange() {
        this.timeInt = setInterval(() => {
          this.sliderValue = this.timeRemainingSeconds
        }, 100)
      },
      sliderChange() {
        this.listenChange()
      },
      formatTime(time) {
        if (time === 60) {
          return '00'
        } else if (time < 10) {
          return `0${time}`
        } else {
          return time;
        }
      },
      pauseTimer() {
        this.timer.pause()
      },
      createTimer(minutes) {
        this.timer = new Timer(minutes);

        this.startTimer()
      },
      startTimer() {
        console.log(this.switchValue)
        if (this.switchValue === true) {
          console.log("888");
          console.log(this.timer.time)
          this.timer.start();
        }

      },
      pauseTimer() {
        this.timer.pause()
      },
      initTimer() {
        if (this.delayMins) {
          this.createTimer(this.delayMins)
        } else {
          this.createTimer(this.workMinutes)
        }
      },

      settingsClick() {
        this.pauseTimer()
        EventBus.$emit('open-settings')

      }

    },
  }

</script>

<style scoped lang="scss">

    .container {
        height: 120px;
        width: 320px;
    }

    .arrow-up {
        margin: 0 auto;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;

    }

    .content-container {
        /*border: 1px solid gray;*/
        border-radius: 15px;
        -webkit-box-shadow: 0 0 5px #777777;
        background-color: white;
    }

    .dial-time {
        margin: 0;
        font-size: 57px;
        line-height: 1.15;
        padding: 0 15px;
        color: #53B2EB;
    }

    .switch {
        padding: 10px;
    }

    .el-icon-setting {
        font-size: 1.5em;
    }


</style>
