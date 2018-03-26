<template>
    <div class="container">
        <timer-work v-if="currentWindow==='work-window'" :delayMins="delayMins"/>
        <timer-settings v-else-if="currentWindow==='settings-window'"/>
        <timer-break v-else-if="currentWindow==='break-window'"/>
    </div>
</template>

<script>
  // import timerSettings from './timer-settings'
  import {EventBus} from "../../utils/event-bus";
  import timerWork from './timer-work'
  import timerSettings from './timer-settings'
  import timerBreak from './timer-break-dial'
  import BrowserWindow from '../../utils/browser-window'

  const bWindow = new BrowserWindow();

  export default {
    data() {
      return {
        enableSwitch: true,
        sliderValue: 50,
        currentWindow: 'work-window',
        delayMins: null
      }
    },
    components: {
      timerSettings,
      timerWork,
      timerBreak,
    },
    computed: {
      currentBreak() {
        this.$store.getters.currentBreak;
      }
    },
    mounted() {
      // 使用eventbus 为了之后拆分到不同 component 通信
      EventBus.$on('open-settings', () => {
        this.currentWindow = 'settings-window'
        bWindow.resetSettingsWindow();
      });
      EventBus.$on('open-break', () => {
        this.currentWindow = 'break-window'
        bWindow.resetBreakWindow();
      });

      EventBus.$on('get-current-break', () => {
        return this.$store.getters.currentBreak;
      });

      EventBus.$on('open-work', () => {
        this.currentWindow = 'work-window'
        bWindow.resetWorkWindow();
      });

      EventBus.$on('break-delay', (min) => {
        alert('receive break delay')
        this.delayMins = min;
        this.currentWindow = 'work-window';
        bWindow.resetWorkWindow();
      });

      EventBus.$on('settings-done', (changed) => {
        if (changed) {
          // this.initTimer()
        } else {
          // this.timer.resume()
        }
        this.currentWindow = 'work-window'
        bWindow.resetWorkWindow();
      });
      EventBus.$on('window-blur', () => {
        console.log('window-blur')
        console.log(this.currentWindow)
        if (this.currentWindow === 'settings-window') {
          EventBus.$emit('open-work')
        }
        ;
      });
      EventBus.$on('timer-completed', () => {
        const currentBreak = this.$store.getters.currentBreak;
        const round = this.$store.getters.round;
        const workRounds = this.$store.getters.workRounds;
        // alert("round: " + round + ' workRounds: ' + workRounds)
        if (currentBreak === 'work') {
          if (round > workRounds) {
            this.$store.dispatch('setCurrentBreak', 'long-break')
          } else {
            this.$store.dispatch('setCurrentBreak', 'short-break')
          }
          EventBus.$emit('open-break')
        } else {
          if (currentBreak === 'short-break') {
            this.$store.dispatch('setCurrentBreak', 'work')
          } else if (currentBreak === 'long-break') {
            this.$store.dispatch('setCurrentBreak', 'work')
          }
          EventBus.$emit('open-work')
        }
      });
    },
    methods: {}
  }
</script>

