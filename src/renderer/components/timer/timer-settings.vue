<template>
    <div class="container">
        <div class="titlebar">
            <div class="buttons">
                <div class="button close" @click="clickClose">
                    <!--<a @click="clickClose" class="closebutton" href="#"></a>-->
                </div>
                <div class="button disable">
                </div>
                <div class="button disable">
                </div>
            </div>
            Settings
        </div>



        <el-row style="padding: 15px">
            <el-col :span="10" :offset="14"><span style="font-size: 14px">BreakTime is:</span>
                <el-switch v-model='enableSwitch' :width="50" style="padding-left: 10px"></el-switch>
            </el-col>

        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p>Work Time: </p></el-col>
            <el-col :span="12">
                <el-slider v-model="sliderWorkValue" :max="120" :show-input="true" :show-input-controls="false"></el-slider>
            </el-col>
            <el-col :span="2">
                <!--<input type="number" v-model="inputWorkBreakValue"-->
                       <!--@change="inputOnChange($event, 'work-break')">-->
                <span>Minutes</span>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p>Short Break: </p></el-col>
            <el-col :span="12">
                <el-slider v-model="sliderShortBreakValue" :max="10" :show-input="true" :show-input-controls="false"></el-slider>
            </el-col>
            <el-col :span="2">
                <!--<input type="number" v-model="inputShortBreakValue"-->
                       <!--@change="inputOnChange($event, 'short-break')">-->
                <span>Minutes</span>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p>Long Break: </p></el-col>
            <el-col :span="12">
                <el-slider v-model="sliderLongBreakValue" :max="30" :show-input="true" :show-input-controls="false"></el-slider>
            </el-col>
            <el-col :span="2">
                <!--<input type="number" v-model="inputLongBreakValue"-->
                       <!--@change="inputOnChange($event, 'long-break')">-->
                <span>Minutes</span>
            </el-col>
        </el-row>

        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p>Round: </p></el-col>
            <el-col :span="12">
                <el-slider v-model="sliderRound" :max="10" :show-input="true" :show-input-controls="false"></el-slider>
            </el-col>
            <el-col :span="2">
                <!--<input type="number" v-model="inputRound"-->
                       <!--@change="inputOnChange($event, 'round')" min="1">-->
                <span>Rounds</span>
            </el-col>
        </el-row>


        <!--<el-row type="flex" align="middle">-->
            <!--<el-col :span="6" class="setting-name"><p>Play Sounds:</p></el-col>-->
            <!--<el-col :span="2">-->
                <!--<el-checkbox></el-checkbox>-->
            <!--</el-col>-->
            <!--<el-col :span="14"></el-col>-->

        <!--</el-row>-->

        <el-row style="margin-top: 15px">
            <el-col :span="6" :offset="16">
                <el-button size="mini" style=" font-size: 13px;padding: 5px;margin-bottom: 10px" @click="quitApp">
                    Quit BreakTime
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {EventBus} from "../../utils/event-bus";

    export default {
    data() {
      return {
        // sliderLongBreakValue: 0,
        // sliderShortBreakValue: 0,
        // sliderWorkValue: 0,
        // inputWorkBreakValue: 0,
        // inputShortBreakValue: 0,
        // inputLongBreakValue: 0,
        // enableSwitch: true,
        // workSettingChanged:false,
        //
        sliderWorkValue: this.$store.getters.timeWork,
        sliderShortBreakValue: this.$store.getters.timeShortBreak,
        sliderLongBreakValue: this.$store.getters.timeLongBreak,
        sliderRound: this.$store.getters.workRounds,

        inputWorkBreakValue: this.$store.getters.timeWork,
        inputShortBreakValue: this.$store.getters.timeShortBreak,
        inputLongBreakValue: this.$store.getters.timeLongBreak,
        inputRound: this.$store.getters.workRounds,
        enableSwitch: true,
        workSettingChanged:false,
      }
    },
    watch: {
      sliderWorkValue(val) {
        if(val <= 0){
          val = 1
        }
        this.$store.dispatch('setTime', {key: 'time-work', value: val});
        if (val != this.inputWorkBreakValue) {
          this.inputWorkBreakValue = val;
          this.workSettingChanged = true;
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

      sliderRound(val) {
        this.$store.dispatch('setTime', {key: 'work-rounds', value: val});
        if (val != this.inputRound) {
          this.inputRound = parseInt(val);
        }
      },

    },
    mounted() {
      this.workSettingChanged = false
      // alert('mounted')
      this.initSettings();
    },
    methods: {
      initSettings() {
        // this.sliderWorkValue = this.$store.getters.timeWork;
        // this.sliderShortBreakValue = this.$store.getters.timeShortBreak;
        // this.sliderLongBreakValue = this.$store.getters.timeLongBreak;



      },
      // inputOnChange(e, inputName) {
      //   console.log(e.target.value + inputName)
      //   let valueInt = parseInt(e.target.value);
      //   if (valueInt <= 0){
      //     valueInt = 1;
      //   }
      //   switch (inputName) {
      //     case 'work-break':
      //       this.sliderWorkValue = valueInt;
      //       break;
      //     case 'short-break':
      //       this.sliderShortBreakValue = valueInt;
      //       this.$store.commit('SET_TIME', {key: 'time-short-break', value: valueInt})
      //
      //       break;
      //     case 'long-break':
      //       this.sliderLongBreakValue = valueInt;
      //       this.$store.commit('SET_TIME', {key: 'time-long-break', value: valueInt})
      //       break
      //     case 'round':
      //       this.sliderRound = valueInt;
      //       this.$store.commit('SET_TIME', {key: 'work-rounds', value: valueInt})
      //       break
      //   }
      // },
      quitApp() {
        const app = require('electron').remote.app;
        app.quit();
      },
      clickClose(){
        alert(this.workSettingChanged);
        EventBus.$emit('settings-done', this.workSettingChanged)
      }

    }
  }
</script>

<style scoped lang="scss">

    input[type=number] {
        width: 40px;
    }

    .el-col{
        /*border: 1px solid red;*/
    }

    .container {
        font-size: 14px;
        height: 260px;
        width: 500px;
        box-sizing: content-box;
        background: #ECECEC;
        font-family: "PingFang SC", HelveticaNeue, 'Helvetica Neue', 'Lucida Grande', Arial, sans-serif;
        /*-webkit-box-shadow: 0 0 5px #777777;*/
        border-radius: 15px;

        /*background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5)*/
        /*border: 1px solid black;*/
        /*border-radius: 6px;*/
    }
    .title {
        text-align: center;
        border-bottom: 1px solid black;
        font-weight: bold;
        padding: 3px 0;
        p{
            margin: 0;
        }
    }
    .el-row {
        /*border: 1px solid yellow;*/
        /*border-bottom: 1px solid #eee;*/
    }
.el-slider{
    padding-right: 5px;
}
    .setting-name {
        padding-right: 15px;
        line-height: 0.4em;
        p {
            text-align: right;
        }
    }


    input[type=number] {
        font-size: 15px;
    }


    .titlebar {
        /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));*/
        background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
        /*background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);*/
        /*background: -ms-linear-gradient(top, #ebebeb, #d5d5d5);*/
        /*background: -o-linear-gradient(top, #ebebeb, #d5d5d5);*/
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
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        cursor: default;
    }

    .buttons {
        padding-left: 8px;
        padding-top: 3px;
        float: left;
        line-height: 11px;
        .disable{
            margin-left: 4px;
            background: #D3D3D3;
            font-size: 9pt;
            width: 11px;
            height: 11px;
            border: 1px solid #B1B0B1;
            border-radius: 50%;
            display: inline-block;
        }
        .close:hover{
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
