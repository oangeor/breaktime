<template>
    <div>
        <el-row type="flex" align="middle">
            <el-col :span="6" class="setting-name"><p>{{settingName}}</p></el-col>
            <el-col :span="12">
                <el-slider @change="sliderChange"
                           v-model="value"
                           :max="max"
                           :show-input="true"
                           :show-input-controls="false"
                           :settingCase="settingCase"/>
            </el-col>
            <el-col :span="2" style="margin-left: 8px">
                <span>{{unit}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value: this.sliderValue
      }
    },
    props: {
      settingName: String,
      sliderValue: Number,
      max: Number,
      settingCase: String,
      unit: String,
    },
    methods: {
      sliderChange(val) {
        if (val <= 0) {
          this.value = 1;
        }
        this.$emit('change', this.settingCase, this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .setting-name {
        padding-right: 15px;
        line-height: 0.4em;
        p {
            text-align: right;
        }

    }
</style>