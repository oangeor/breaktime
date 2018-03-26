<template>
    <div class="container">
        <div class="titlebar">
            <div class="buttons">
                <div class="button close" @click="clickClose">
                </div>
                <div class="button disable">
                </div>
                <div class="button disable">
                </div>
            </div>
            Settings
        </div>


        <el-row style="padding: 15px">
            <el-col :span="10" :offset="16"><span style="font-size: 14px">Switch:</span>
                <el-switch v-model="switchValue" :width="50" style="padding-left: 10px"></el-switch>

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
    </div>
</template>

<script>
  import {EventBus} from "../../utils/event-bus";
  import sliderSetting from "./slider-setting"

  export default {
    components: {sliderSetting},
    data() {
      return {
        Round: "Round",
        sliderWorkValue: this.$store.getters.timeWork,
        sliderShortBreakValue: this.$store.getters.timeShortBreak,
        sliderLongBreakValue: this.$store.getters.timeLongBreak,
        sliderRound: this.$store.getters.workRounds,
        swtichValue: true,
        workSettingChanged: false,
      }
    },
    mounted() {
      this.workSettingChanged = false
    },
    methods: {
      quitApp() {
        const app = require('electron').remote.app;
        app.quit();
      },
      clickClose() {
        EventBus.$emit('settings-done', this.workSettingChanged)
      },
      settingChange(caseName, val) {
        switch (caseName) {
          case 'work-rounds':
            this.workSettingChanged = true;
            this.$store.dispatch('setTime', {key: 'work-rounds', value: val});
            break;
          case 'time-work':
            this.$store.dispatch('setTime', {key: 'time-work', value: val});
            break;
          case 'time-short-break':
            this.$store.dispatch('setTime', {key: 'time-short-break', value: val});
            break;
          case 'time-long-break':
            this.$store.dispatch('setTime', {key: 'time-long-break', value: val});
            break
        }
      }

    }
  }
</script>

<style scoped lang="scss">

    .container {
        font-size: 14px;
        height: 270px;
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

    input[type=number] {
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
            background: #D3D3D3;
            font-size: 9pt;
            width: 11px;
            height: 11px;
            border: 1px solid #B1B0B1;
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
