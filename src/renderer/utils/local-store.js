const electron = require('electron')
const fs = require('fs');
const path = require('path');

console.log(fs);
console.log(path);

export const defaults = {
  // alwaysOnTop: false,
  // notifications: true,
  workRounds: '4',
  timeLongBreak: '15',
  timeShortBreak: '5',
  timeWork: '25'
}

export function createLocalStore() {
  const localStore = new LocalStore({
    configName: 'user-preferences',
    defaults
  })
  return localStore
}

export default class LocalStore {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, opts.configName + '.json');
    console.log(this.path);
    this.data = parseDataFile(this.path, opts.defaults)
  }

  get(key) {
    return this.data[key]
  }

  set(key, val) {
    console.log(fs);
    this.data[key] = val
    fs.writeFile(this.path, JSON.stringify(this.data), err => {
      if (err) {
        console.log(err)
      }
    });
    console.log(`wrote ${key}: ${val} to local store`)
  }

  setData(dataObj) {
    this.data = dataObj
    console.log(dataObj, this.data)
    fs.writeFile(this.path, JSON.stringify(this.data), err => {
      if (err) {
        console.log(err)
      }
    })
  }

  reload() {
    this.data = parseDataFile(this.path, defaults)
  }
}


function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    return defaults
  }
}
