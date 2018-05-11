<template>
    <div class="wrapper">
        <div class="container">
            <div class="title">
                <p>BreakTime</p>
            </div>
            <div class="content-container">
                <div class="time-show">
                    <p>{{timeElapsed}}</p>
                    <p>{{timeRemaining}}</p>

                </div>
                <div class="process-bar">
                    <el-progress :show-text="false" :percentage="percentage" :stroke-width="18"></el-progress>
                </div>
                <div class="button-row" round>
                    <div class="Button">
                        <el-dropdown :split-button="true" type="info" @click="dropDownClick" @command="dropDownCommand"
                                     placement="bottom">
                            In a Minute
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">In a Minute</el-dropdown-item>
                                <el-dropdown-item command="5">In 5 Minute</el-dropdown-item>
                                <el-dropdown-item command="15">In 15 Minute</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="Button">
                        <el-button type="info" size="medium" @click="doneButtonClick"> Done</el-button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Timer from "../../utils/timer";
import { EventBus } from "../../utils/event-bus";
const { ipcRenderer } = require("electron");

export default {
  data() {
    return {
      timer: null
    };
  },
  created() {
    ipcRenderer.on("break-start", (event, breakMin) => {
      console.log("break-start breakmins is ", breakMin);
      this.createTimer(breakMin);
    });
    EventBus.$on("timer-completed", () => {
      // console.log("timer-completed!!!")
      ipcRenderer.send("timer-completed", "break");
      // this.resetTimer();
    });
  },
  computed: {
    timeElapsed() {
      if (!this.timer) {
        return "XXX";
      }
      const { elapsedMinutes, elapsedSeconds } = this.timer.getElapsed();
      return `${this.formatTime(elapsedMinutes)}:${this.formatTime(
        elapsedSeconds
      )}`;
    },

    timeRemaining() {
      if (!this.timer) {
        return "XXX";
      }
      const { remainingMinutes, remainingSeconds } = this.timer.getRemaining();
      console.log(remainingMinutes, remainingSeconds);
      if (remainingMinutes < 0) {
        return `00:${this.formatTime(remainingSeconds)}`;
      }
      return `${this.formatTime(remainingMinutes)}:${this.formatTime(
        remainingSeconds
      )}`;
    },
    percentage() {
      if (!this.timer) {
        return 0;
      }
      const elapsedSeconds = this.timer.time;
      const totalSeconds = this.timer.totalSeconds;
      const percentage = parseInt(elapsedSeconds / totalSeconds * 100);
      return percentage;
    }
  },
  methods: {
    formatTime(time) {
      if (time === 60) {
        return "00";
      } else if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    },
    doneButtonClick() {
      this.timer.setComplete();
    },
    dropDownClick(e) {
      this.dropDownCommand(e);
    },
    dropDownCommand(command) {
      const delayMin = parseInt(command);
      console.log("dropdwon command minute", delayMin);
      ipcRenderer.send("break-delay", delayMin);
      this.pauseTimer();
    },
    createTimer(minutes) {
      this.resetTimer() // clear previouse timers
      this.timer = new Timer(minutes);
      this.startTimer();
    },
    startTimer() {
      this.timer.start();
    },
    pauseTimer() {
      this.timer.pause();
    },
    resetTimer() {
      if (this.timer) {
        this.timer.reset();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
}

p {
  margin: 0;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0 0 15px black;
  border-radius: 6px;
  background: white;
}

.title {
  text-align: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 3px 0;
}

.content-container {
  display: flex;
  padding: 0 12px;
  flex-direction: column;
  width: 300px;
  height: 125px;
}

.time-show {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 28px;
  margin-top: 12px;
}

.time-show p:nth-child(1) {
  color: #409efe;
}

.time-show p:nth-child(2) {
  color: #909399;
}

.process-bar {
  margin-top: 14px;
}

.button-row {
  margin-top: 12px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  float: left;
}
</style>
