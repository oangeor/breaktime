<template>
    <div class="container">
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
                        <el-slider v-model="sliderValue" :max="sliderMax"></el-slider>
                    </el-col>
                    <el-col :span="4" class="settings" style="padding: 8px"><i class="el-icon-setting"
                                                                               @click="settingsClick"></i>
                    </el-col>

                </el-row>

            </el-col>
        </el-row>

    </div>
</template>

<script>
  import Timer from '../../utils/timer'
  import store from '../../store'

  const BrowserWindow = require('electron').remote.BrowserWindow
  const path = require('path')
  let settingsWin = null;
  function sleep(time) {
    return new Promise((resolve => setTimeout(resolve, time)));
  }
  const createSettingsWin = () => {
    // sleep(10000).then(()=>{
    //   alert("time out!")
    // });
    const winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080#settings`
      : `file://${__dirname}/index.html#settings`
    let win = new BrowserWindow({
      width: 500,
      height: 280,
      backgroundColor: '#ECECEC',
      minimizable: false,
      maximizable: false,
      resizable: false,
      show:false
    });
    win.on('close', function () {
      win = null
    });
    win.on('blur', () => {
        // eventbus.commit
      // this.$store.dispatch('resetTime');
      // const newTimeWork = this.workMinutes;
      // this.initTimer();
    });
    win.on('resize', () => {
      const message = `大小: ${win.getSize()} - 位置: ${win.getPosition()}`;
      console.log(message)
    });
    win.loadURL(winURL);
    return win;
  };
  export default {
    data() {
      return {
        timer: null,
        enableSwitch: true,
        timeUnit: 'minutes'
      }
    },
    created() {
      this.initTimer();
    },
    mounted() {
      settingsWin = createSettingsWin()
    },
    computed: {
      sliderValue() {
        return this.timeRemainingSeconds;
      },
      timeRemainingSeconds() {
        let remainingSeconds = this.timer.getRemainingSeconds()
        return remainingSeconds;
      },

      timeRemaining() {
        const {remainingMinutes, remainingSeconds} = this.timer.getRemaining(this.workMinutes);
        if (remainingMinutes < 0) {
          this.timeUnit = 'seconds';
          return this.formatTime(remainingSeconds)
        }
        return this.formatTime(remainingMinutes)
      },

      sliderMax() {
        return this.workMinutes * 60;
      },

      workMinutes() {
        return this.$store.getters.timeWork;
      }
    },
    methods: {
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
      initTimer() {
        this.createTimer(this.workMinutes)
      },
      settingsClick() {

        console.log("xxx")
        // const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
        const oldTimeWork = this.workMinutes;
        this.timer.pause();
      }
    },
  }

</script>

<style>

    .container {
        width: 320px;
        /*height: 80px;*/
        border: 1px solid gray;

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
