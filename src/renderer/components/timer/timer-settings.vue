<template>
    <div class="container">
        <el-row style="padding: 15px">
            <el-col :span="10" :offset="14"><span style="font-size: 14px">BreakTime is:</span>
                <el-switch v-model='enableSwitch' :width="50" style="padding-left: 10px"></el-switch>
            </el-col>

        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p align="right">Work Time : </p></el-col>
            <el-col :span="10">
                <el-slider v-model="sliderWorkValue" :max="120"></el-slider>
            </el-col>
            <el-col :span="6">
                <input type="number" style="width: 40px;" v-model="inputWorkBreakValue"
                       @change="inputOnChange($event, 'work-break')">
                <span>Minutes</span>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p align="right">Short Break : </p></el-col>
            <el-col :span="10">
                <el-slider v-model="sliderShortBreakValue" :max="10"></el-slider>
            </el-col>
            <el-col :span="6">
                <input type="number" style="width: 40px;" v-model="inputShortBreakValue"
                       @change="inputOnChange($event, 'short-break')">
                <span>Minutes</span>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p align="right">Long Break : </p></el-col>
            <el-col :span="10">
                <el-slider v-model="sliderLongBreakValue" :max="30"></el-slider>
            </el-col>
            <el-col :span="6">
                <input type="number" style="width: 40px;" v-model="inputLongBreakValue"
                       @change="inputOnChange($event, 'long-break')">
                <span>Minutes</span>
            </el-col>
        </el-row>

        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p align="right">Play Sounds:</p></el-col>
            <el-col :span="2">
                <el-checkbox></el-checkbox>
            </el-col>
            <el-col :span="14"></el-col>

        </el-row>

        <el-row>
            <el-col :span="6" :offset="16">
                <el-button size="medium" style=" font-size: 13px;padding: 5px;margin-bottom: 10px" @click="quitApp">
                    Quite BreakTime
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        sliderLongBreakValue: 0,
        sliderShortBreakValue: 0,
        sliderWorkValue: 0,
        inputWorkBreakValue: 0,
        inputShortBreakValue: 0,
        inputLongBreakValue: 0,
        enableSwitch: true
      }
    },
    // computed: {
    //   sliderLongBreakValue(){
    //     return this.$store.getters.timeWorkBreak;
    //   }
    // },
    watch: {
      sliderWorkValue(val) {
        this.$store.dispatch('setTime', {key: 'time-work', value: val});
        if (val != this.inputWorkBreakValue) {
          this.inputWorkBreakValue = val;
        }
      },
      sliderShortBreakValue(val) {
        this.$store.dispatch('setTime', {key: 'time-short-break', value: val});

        if (val != this.inputShortBreakValue) {
          this.inputShortBreakValue = parseInt(val);
        }
      },
      sliderLongBreakValue(val) {
        this.$store.dispatch('setTime', {key: 'time-long-break', value: val});
        if (val != this.inputLongBreakValue) {
          this.inputLongBreakValue = parseInt(val);
        }
      },

    },
    mounted() {
      this.initSettings();
    },
    methods: {
      initSettings() {
        this.sliderWorkValue = this.$store.getters.timeWork;
        this.sliderShortBreakValue = this.$store.getters.timeShortBreak;
        this.sliderLongBreakValue = this.$store.getters.timeLongBreak;

      },
      inputOnChange(e, inputName) {
        console.log(e.target.value + inputName)
        const valueInt = parseInt(e.target.value);
        switch (inputName) {
          case 'work-break':
            this.sliderWorkValue = valueInt;
            break;
          case 'short-break':
            this.sliderShortBreakValue = valueInt;
            this.$store.commit('SET_TIME', {key: 'time-short-break', value: valueInt})

            break;
          case 'long-break':
            this.sliderLongBreakValue = valueInt;
            this.$store.commit('SET_TIME', {key: 'time-long-break', value: valueInt})

            break
        }
      },
      quitApp() {
        const app = require('electron').remote.app;
        app.quit();
      }

    }
  }
</script>

<style scoped>

    /*input[type=number]::-webkit-inner-spin-button,*/
    /*input[type=number]::-webkit-outer-spin-button {*/
        /*-webkit-appearance: none;*/
        /*margin: 0;*/
    /*}*/

    .container {
        font-size: 16px;
        /*height: 280px;*/
        /*width: 480px;*/
        box-sizing: content-box;
        /*border: 1px solid red;*/
    }

    .el-col {
        /*border: 1px solid yellow;*/
    }

    .setting-name {
        padding-right: 15px;
        line-height: 0.4em;
    }

    .el-slider {
        padding-right: 15px;
    }

    input[type=number]{
        font-size: 15px;
    }
</style>
