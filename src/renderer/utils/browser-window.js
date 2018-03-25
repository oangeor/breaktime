import {ipcRenderer} from 'electron'
import {EventBus} from "./event-bus";


const workWindow = {
  winWidth: 100,
  winHeight: 100,
};
const settingsWindow = {
  winWidth: 100,
  winHeight: 100,
};


export default class {
  constructor() {
    const win = require('electron').remote.getCurrentWindow();
    this.win = win;
    // window.onbeforeunload = (e) => {
    //   this.win.hide()
    //   e.returnValue = true;
    // };

  }

  showWindow(){
    if (!this.win.isVisible()) {
      this.win.show();
      this.win.focus();
    }
  }
  resetWindow({width, height}) {
    this.win.setSize(width, height);
    this.showWindow()
  }

  moveUnderTrayIcon() {
    const trayBounds = ipcRenderer.sendSync('get-tray-bounds');
    const windowBounds = this.win.getBounds();
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = Math.round(trayBounds.y + trayBounds.height + 3);
    this.win.setPosition(x, y)
  }

  moveScreenCenter() {
    const screen = require('electron').screen;
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const windowBounds = this.win.getBounds();

    const x = Math.round(workAreaSize.width / 2 - windowBounds.width / 2);
    const y = Math.round(workAreaSize.height / 2 - windowBounds.height / 2);
    this.win.setPosition(x, y)
  }

  resetWorkWindow() {
    const windowBounds = this.win.getBounds();

    this.resetWindow({
      width: windowBounds.width,
      height: windowBounds.height,
    })
  }

  resetBreakWindow() {
    this.showWindow();
    this.win.maximize()
  }

  resetSettingsWindow() {

    this.resetWindow({
      width: 522,
      height: 252,
    });
    this.win.maximize()

    this.moveScreenCenter()

  }
}




