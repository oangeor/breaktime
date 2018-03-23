<template>
  <div class="container">
    <div class="time-show">
      <p>{{timeElapsed}}</p>
      <p>{{timeRemaining}}</p>

    </div>
    <div class="process-bar">
      <el-progress :show-text="false" :percentage="process" :stroke-width="18"></el-progress>
    </div>
    <div class="button-row" round>
      <div class="Button">
        <el-dropdown split-button type="info" @click="dropDownClick" @command="dropDownCommand">
          In a Minute
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">In a Minute</el-dropdown-item>
            <el-dropdown-item command="5">In 5 Minute</el-dropdown-item>
            <el-dropdown-item command="15">In 15 Minute</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="Button">
        <el-button type="info" size="medium"> Done</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Timer from '../../utils/timer'

  export default {
    data() {
      return {
        timer: null,

      }
    },
    created() {
      this.initTimer()
    },
    computed: {
      currentRound() {
        return this.$store.getters.currentRound;
      },
      timeShortBreak() {
        return this.$store.getters.timeShortBreak;
      },
      timeLongBreak() {
        return this.$store.getters.timeLongBreak;
      },
      currentBreak() {
        switch (this.currentRound) {
          case 'short-break':
            return this.timeShortBreak;
          case 'long-break':
            return this.timeLongBreak;
        }
      },
      timeElapsed() {
        const {elapsedMinutes, elapsedSeconds} = this.timer.getElapsed();
        return `${this.formatTime(elapsedMinutes)}:${this.formatTime(elapsedSeconds)}`
      },

      timeRemaining() {
        const {remainingMinutes, remainingSeconds} = this.timer.getRemaining(this.currentBreak);
        if (remainingMinutes < 0) {
          return '00:00'
        }
        return `${this.formatTime(remainingMinutes)}:${this.formatTime(remainingSeconds)}`
      },
      process() {
        const elapsedSeconds = this.timer.time;
        const totalSeconds = this.timer.totalSeconds;
        const percentage = parseInt(elapsedSeconds / totalSeconds * 100);
        console.log(elapsedSeconds + '\t' + totalSeconds + '\t' + percentage)
        return percentage;

      }
    },
    watch: {
      // selectValue(val) {
      //   console.log(val);
      // }
    },
    mounted() {
    },
    methods: {
      // format

      formatTime(time) {
        if (time === 60) {
          return '00'
        } else if (time < 10) {
          return `0${time}`
        } else {
          return time;
        }
      },
      dropDownClick(e) {
        console.log(e);
      },
      dropDownCommand(command) {
        console.log(command)
        // this.$message(command)
      },
      initTimer() {
        console.log("init time");
        this.createTimer(this.currentBreak)
      },
      createTimer(minutes) {
        this.timer = new Timer(minutes);
        this.startTimer()
      },
      startTimer() {
        this.timer.start();

      },
    }
  }
</script>

<style>

  .container {
    /*position: absolute;*/
    display: flex;
    padding: 12px;
    /*color: white;*/
    flex-direction: column;
    width: 300px;
    height: 120px;
    border: 1px solid black;
    /*background: #252525;*/
    background: #ECECEC;

  }

  .time-show {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 28px;
  }

  .time-show p:nth-child(1) {
    color: #409efe;
  }

  .time-show p:nth-child(2) {
    color: #909399;
  }

  .process-bar {
    margin-top: 20px;
  }

  .button-row {
    /*position: absolute;*/
    /*bottom: 12px;*/
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .button-row .Button {

    /*width: 50%;*/
    /*background: #05EC8C;*/
  }

</style>
