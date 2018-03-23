import {EventBus} from "./event-bus";

export default class {
  constructor(min) {
    this.time = 0;
    this.totalSeconds = min * 60;
  }

  start() {
    if (!this.timerInt) {
      this.timerInt = setInterval(
        () => {
          this.time += 1;
          console.log('timer click' + this.time)
          if (this.time >= this.totalSeconds) {
            this.pause();
            EventBus.$emit('timer-completed')
          }
        }, 1000);
      // EventBus.$emit('timer-started')
    }
  }

  pause() {
    clearInterval(this.timerInt);
    delete this.timerInt;
    console.log(this);
    EventBus.$emit('timer-pause')
  }

  reset() {
    clearInterval(this.timerInt);
    delete this.timerInt;
    this.time = 0;
    // EventBus.$emit('timer-reset')
  }

  resume() {
    if (!this.timerInt) {
      this.start();
      // EventBus.$emit('timer-resumed')
    }
  }

  getRemainingSeconds() {
    return this.totalSeconds - this.time;
  }

  getElapsed() {
    const elapsedMinutes = Math.floor(this.time / 60)
    const elapsedSeconds = this.time - (elapsedMinutes * 60)
    console.log("xxx" + elapsedMinutes + ' : ' + elapsedSeconds)
    return {
      elapsedMinutes,
      elapsedSeconds,
    }
  }

  getRemaining(minutes) {
    const {elapsedMinutes, elapsedSeconds} = this.getElapsed();
    const remainingSeconds = 60 - elapsedSeconds;
    let remainingMinutes = minutes - elapsedMinutes;
    if (elapsedSeconds > 0) {
      remainingMinutes -= 1;
    }
    return {
      remainingMinutes,
      remainingSeconds
    }
  }


}
