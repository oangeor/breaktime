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
                        <el-col :span="18" style="font-size: 14px;padding: 1px">{{timeUnit}} until break</el-col>
                        <el-col :span="6" class="switch">
                            <el-switch
                                    v-model='enableSwitch'
                            ></el-switch>
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
                    <!--<el-row>-->
                    <!--<el-button size="medium" style=" font-size: 13px;padding: 5px;margin-bottom: 10px" @click="testClick">-->
                    <!--click start-->
                    <!--</el-button>-->
                    <!--</el-row>-->
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
  import Timer from '../../utils/timer'
  import {EventBus} from "../../utils/event-bus";
  import store from '../../store'
  // function createSettingsW() {

  // }
  // const BrowserWindow = require('electron').remote.BrowserWindow
  // const path = require('path')
  // let settingsWin = null;
  // const createSettingsWin = () => {
  //   const winURL = process.env.NODE_ENV === 'development'
  //     ? `http://localhost:9080#settings`
  //     : `file://${__dirname}/index.html#settings`
  //   let win = new BrowserWindow({
  //     width: 500,
  //     height: 280,
  //     backgroundColor: '#ECECEC',
  //     minimizable: false,
  //     maximizable: false,
  //     resizable: false,
  //     show: false
  //   });
  //   win.on('close', function () {
  //     win = null
  //   });
  //   win.on('blur', () => {
  //     // eventbus.commit
  //     // this.$store.dispatch('resetTime');
  //     // const newTimeWork = this.workMinutes;
  //     // this.initTimer();
  //   });
  //   win.on('resize', () => {
  //     const message = `大小: ${win.getSize()} - 位置: ${win.getPosition()}`;
  //     console.log(message)
  //   });
  //   win.loadURL(winURL);
  //   return win;
  // };
  export default {
    props: ['delayMins'],
    data() {
      return {
        timer: null,
        enableSwitch: true,
        timeUnit: 'minutes',
        sliderValue: 100,
        timeInt: null,
      }
    },
    created() {
      this.initTimer();
    },
    mounted() {
      this.listenChange()
    },
    watch: {
      sliderValue() {
        console.log(this.sliderValue)
        if (this.timeInt) {
          clearInterval(this.timerInt);
        }
        if (this.sliderValue >= 60){
          this.timeUnit = "minutes"
        }else{
          this.timeUnit = "seconds"
        }
        this.timer.resetElapsedTime(this.sliderValue)
      }
    },
    computed: {
      timeUnite(){

      },
      // sliderValue() {
      //   return this.timeRemainingSeconds;
      // },

      // sliderValue: {
      //   get: function () {
      //     console.log("get...")
      //     return this.timeRemainingSeconds;
      //   },
      //   set: function () {
      //   }
      // },

      timeRemainingSeconds() {
        let remainingSeconds = this.timer.getRemainingSeconds()
        return remainingSeconds;
      },

      timeRemaining() {
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
      listenChange() {
        this.timeInt = setInterval(() => {
          this.sliderValue = this.timeRemainingSeconds
        }, 100)
      },
      sliderChange() {
        console.log("listen ...change ...")
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
      createTimer(minutes) {
        this.timer = new Timer(minutes);
        this.startTimer()
      },
      startTimer() {
        this.timer.start();

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
        // EventBus.$emit('set-current-break','settings-window')
        this.timer.pause()
        EventBus.$emit('open-settings')

      }

    },
  }

</script>

<style scoped lang="scss">

    .container {
        width: 320px;
    }

    .arrow-up {
        margin: 0 auto;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
        /*-webkit-box-shadow: 0 0 10px #777777;*/

    }

    .content-container {
        /*border: 1px solid gray;*/
        border-radius: 15px;
        -webkit-box-shadow: 0 0 5px #777777;
        background-color: white;
    }

    .el-col {
        /*border: 1px solid red;*/
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
