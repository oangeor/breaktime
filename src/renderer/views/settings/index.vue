<template>
    <div class="container">
    
        <el-row style="padding: 15px">
            <el-col :span="10" :offset="16"><span style="font-size: 14px">Switch:</span>
                <el-switch v-model="switchValue" :width="50" style="padding-left: 10px" @change="switchChange"/>
            </el-col>

        </el-row>

        <slider-setting settingName="Work Time:" @change="settingChange" :max="120" :sliderValue="sliderWorkValue"
                        settingCase="time-work" unit="Minutes"/>
        <slider-setting settingName="Short Break:" @change="settingChange" :max="10"
                        :sliderValue="sliderShortBreakValue" settingCase="time-short-break" unit="Minutes"/>
        <slider-setting settingName="Long Break" @change="settingChange" :max="30" :sliderValue="sliderLongBreakValue"
                        settingCase="time-long-break" unit="Minutes"/>

        <slider-setting settingName="Round:" @change="settingChange" :max="10" :sliderValue="sliderRound"
                        settingCase="work-rounds" unit="Rounds"/>


        <el-row style="margin-top: 15px">
            <el-col :span="6" :offset="16">
                <el-button size="mini" style=" font-size: 13px;padding: 5px;margin-bottom: 10px" @click="quitApp">
                    Quit BreakTime
                </el-button>
            </el-col>
        </el-row>
        <el-row>
          <span>currentBreak {{this.$store.getters.currentBreak}}</span>
        </el-row>

        <el-row>
          <span>round {{this.$store.getters.round}}</span>
        </el-row>

                <el-row>
          <span>workRounds {{this.$store.getters.workRounds}}</span>
        </el-row>

                       <el-row>
          <span>workRounds {{testTime}}</span>
        </el-row>


        <el-row>
          <span>store {{settings}}</span>
        </el-row>

        <el-button @click="sendRpc">send rpc render</el-button>
    </div>
</template>

<script>
import { EventBus } from "../../utils/event-bus"
import sliderSetting from "./component/SliderSettings"
import { BrowserWindow } from "electron"
const { ipcRenderer } = require("electron")

const Store = require("electron-store")
const store = new Store()
console.log(store)

// window.onbeforeunload = e => {
//     ipcRenderer.send("hide-settings-window")
//     e.returnValue = true
// }

export default {
  components: { sliderSetting },
  data() {
    return {
      Round: "Round",
      // sliderWorkValue: this.$store.getters.timeWork,
      switchValue: this.$store.getters.mainSwitch,
      workSettingChanged: false,
      testTime: "空"
    }
  },
  computed: {
    settings() {
      console.log("store.store")
      return store.store
    },
    sliderWorkValue() {
      return this.$store.getters.timeWork
    },

    sliderShortBreakValue() {
      return this.$store.getters.timeShortBreak
    },
    sliderLongBreakValue() {
      return this.$store.getters.timeLongBreak
    },
    sliderRound() {
      return this.$store.getters.workRounds
    }
  },
  mounted() {
    this.workSettingChanged = false
    ipcRenderer.send("work-start", this.$store.getters.timeWork)
    ipcRenderer.on("break-delay", event => {}),
      ipcRenderer.on("timer-completed", event => {
        console.log("timer-completed!!!!!")
        const currentBreak = this.$store.getters.currentBreak
        const round = this.$store.getters.round
        const workRounds = this.$store.getters.workRounds
        // alert("round: " + round + ' workRounds: ' + workRounds)
        if (currentBreak === "work") {
          if (round >= workRounds) {
            this.$store.dispatch("setCurrentBreak", "long-break")
            this.testTime = "long-break"
            ipcRenderer.send("break-start", this.$store.getters.timeLongBreak)
          } else {
            this.$store.dispatch("setCurrentBreak", "short-break")
            this.testTime = "short-break"
            ipcRenderer.send("break-start", this.$store.getters.timeShortBreak)
          }
          //   EventBus.$emit('open-break')
        } else {
          this.testTime = "work"
          if (currentBreak === "short-break") {
            this.$store.dispatch("setCurrentBreak", "work")
          } else if (currentBreak === "long-break") {
            this.$store.dispatch("setCurrentBreak", "work")
          }
          ipcRenderer.send("work-start", this.$store.getters.timeWork)
        }
      })

    //   ipcRenderer.on('timer-completed',function(){
    //       console.log(arguments)
    //   })
  },
  methods: {
    sendRpc() {
      // ipcRenderer.send("break-start",this.$store.getters.timeLongBreak)
      this.$store.dispatch("fetchStore")
    },
    quitApp() {
      ipcRenderer.send("quit-app")
    },
    switchChange(val) {
      this.$store.dispatch("setMainSwitch", val)
    },
    settingChange(caseName, val) {
      switch (caseName) {
        case "work-rounds":
          this.workSettingChanged = true
          this.$store.dispatch("setWorkRounds", val)
          break
        case "time-work":
          this.$store.dispatch("setTimeWork", val)
          break
        case "time-short-break":
          this.$store.dispatch("setTimeShortBreak", val)
          break
        case "time-long-break":
          this.$store.dispatch("setTimeLongBreak", val)
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  font-size: 14px;
  // height: 270px;
  // width: 500px;
  box-sizing: content-box;
  background: #ececec;
  border-radius: 15px;
}

.title {
  text-align: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 3px 0;
  p {
    margin: 0;
  }
}

.el-slider {
  padding-right: 5px;
}

.setting-name {
  padding-right: 15px;
  line-height: 0.4em;
  p {
    text-align: right;
  }
}

input[type="number"] {
  font-size: 15px;
}

.titlebar {
  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  background: linear-gradient(top, #ebebeb, #d5d5d5);
  color: #4d494d;
  font-size: 11pt;
  line-height: 20px;
  text-align: center;
  width: 100%;
  height: 20px;
  border-top: 1px solid #f3f1f3;
  border-bottom: 1px solid #b1aeb1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
}

.buttons {
  padding-left: 8px;
  padding-top: 3px;
  float: left;
  line-height: 11px;
  .disable {
    margin-left: 4px;
    background: #d3d3d3;
    font-size: 9pt;
    width: 11px;
    height: 11px;
    border: 1px solid #b1b0b1;
    border-radius: 50%;
    display: inline-block;
  }
  .close:hover {
    cursor: pointer;
  }
}

.buttons:hover a {
  visibility: visible;
}

.close {
  background: #ff5c5c;
  font-size: 9pt;
  width: 11px;
  height: 11px;
  border: 1px solid #e33e41;
  border-radius: 50%;
  display: inline-block;
}

.close:active {
  background: #c14645;
  border: 1px solid #b03537;
}

.close:active .closebutton {
  color: #4e0002;
}

.closebutton {
  color: #820005;
  visibility: hidden;
  cursor: default;
}
</style>
