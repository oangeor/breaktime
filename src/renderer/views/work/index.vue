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
import Timer from "../../utils/timer" 
import { EventBus } from "../../utils/event-bus"
import { ipcRenderer } from "electron"

export default {
  props: ["delayMins"],
  data() {
    return {
      timer: null,
      timeUnit: "minutes",
      sliderValue: 100,
      timeInt: null,
      switchValue: true
    }
  },
  created() {
    ipcRenderer.on("work-start", (event, workMin) => {
      console.log("work-start...", workMin)
      this.createTimer(workMin)
    })
    ipcRenderer.on("break-delay", (event, delayMin) => {
      console.log("work break-delay")
      this.createTimer(delayMin)
    })
  },
  mounted() {
    EventBus.$on("timer-completed", () => {
      console.log("timer-completed!!!")
      ipcRenderer.send("timer-completed", "work")
      this.resetTimer()
    })
  },
  computed: {
    /*
    * store
    */
    timeWork() {
      return this.$store.getters.timeWork
    },

    timeRemainingSeconds() {
      const remainingSeconds = this.timer.getRemainingSeconds()
      return remainingSeconds
    },

    timeRemaining() {
      if (!this.timer) {
        return "XXX"
      }
      const { remainingMinutes, remainingSeconds } = this.timer.getRemaining()
      if (remainingMinutes <= 0) {
        this.timeUnit = "seconds"
        return this.formatTime(remainingSeconds)
      }
      this.timeUnit = "minutes"

      return this.formatTime(remainingMinutes)
    },

    sliderMax() {
      console.log("timeWork: " + this.timeWork * 60)
      return this.timeWork * 60
    }
  },
  watch: {
    sliderValue() {
      console.log(this.sliderValue)
      if (this.timeInt) {
        clearInterval(this.timerInt)
      }
      if (this.sliderValue >= 60) {
        this.timeUnit = "minutes"
      } else {
        this.timeUnit = "seconds"
      }
      this.timer.resetElapsedTime(this.sliderValue)
    }
  },
  methods: {
    switchChange(val) {
      // this.$store.dispatch("setMainSwitch", val)
      if (val === true) {
        this.resumeTimer()
      } else {
        this.pauseTimer()
      }
    },
    // listenChange() {
    //   this.timeInt = setInterval(() => {
    //     this.sliderValue = this.timeRemainingSeconds
    //   }, 100)
    // },
    sliderChange() {
      // this.listenChange()
    },
    formatTime(time) {
      if (time === 60) {
        return "00"
      } else if (time < 10) {
        return `0${time}`
      } else {
        return time
      }
    },
    pauseTimer() {
      this.timer.pause()
    },
    resumeTimer() {
      this.timer.resume()
    },

    createTimer(minutes) {
      this.resetTimer()
      this.timer = new Timer(minutes)
      this.startTimer()
    },
    startTimer() {
      if (this.switchValue === true) {
        this.timer.start()
      }
    },

    settingsClick() {
      // this.pauseTimer()
      ipcRenderer.send('settings-start')
    },
    resetTimer() {
      if (this.timer) {
        this.timer.reset()
        this.sliderValue = this.timeRemainingSeconds
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  // height: 120px;
  // width: 320px;
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
  color: #53b2eb;
}

.switch {
  padding: 10px;
}

.el-icon-setting {
  font-size: 1.5em;
}
</style>
