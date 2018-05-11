import { EventBus } from "./event-bus";
export default class {
  constructor(min) {
    console.log("test...", min)
    this.time = 0;
    this.minutes = min;
    this.totalSeconds = min * 60;
    // this.totalSeconds = 10
    // this.minutes = 0;
    console.log("test...", this)

  }

  start() {
    if (!this.timerInt) {
      this.timerInt = setInterval(
        () => {
          this.time += 1;
          // console.log('timer click' + this.time)
          if (this.time >= this.totalSeconds) {
            this.pause();
            EventBus.$emit('timer-completed')
            // console.log(".....complete!")
            // ipcRenderer.send('timer-completed')
          }
        }, 1000);
      // EventBus.$emit('timer-started')
    }
  }
  setComplete() {
    // this.time = to
    // talSeconds;
    this.pause()
    EventBus.$emit('timer-completed');
  }

  pause() {
    clearInterval(this.timerInt);
    delete this.timerInt;
  }

  reset() {
    clearInterval(this.timerInt);
    delete this.timerInt;
    this.time = 0;
  }

  resume() {
    if (!this.timerInt) {
      this.start();
      // EventBus.$emit('timer-resumed')
    }
  }
  delay() {
    // this.time
  }
  getRemainingSeconds() {
    // console.log("getRemaingSeconds......", this.totalSeconds, this.time)
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

  getRemaining() {
    const { elapsedMinutes, elapsedSeconds } = this.getElapsed();

    console.log("elasp..." +elapsedMinutes+ "xxx" +elapsedSeconds)
    console.log("this.minutes", this.minutes, this.totalSeconds)
    const remainingSeconds = this.totalSeconds > 60 ? 60 : this.totalSeconds - elapsedSeconds;
    let remainingMinutes = this.minutes - elapsedMinutes;
    if (elapsedSeconds > 0) {
      remainingMinutes -= 1;
    }

    console.log("reamining....", remainingMinutes, remainingSeconds)
    return {
      remainingMinutes,
      remainingSeconds
    }
  }

  resetElapsedTime(time) {
    this.time = this.totalSeconds - time;
  }


}
