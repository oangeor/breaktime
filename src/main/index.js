import {app, BrowserWindow, ipcMain, Tray} from 'electron'

let tray = undefined;
let trayWindow = undefined;
const path = require('path');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#timer`
  : `file://${__dirname}/index.html#timer`

function createWindow() {
  trayWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  trayWindow.loadURL(winURL)

  trayWindow.on('closed', () => {
    trayWindow = null
  })

  trayWindow.on('blur', () =>{
    // trayWindow.hide();
  })
}

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   if (trayWindow === null) {
//     createWindow()
//   }
// });
// const assetsDirectory = path.join(__static, '../')
// createTray
const createTray = () => {
  tray = new Tray(path.join(__static, 'tray_icon.png'));
  tray.on('click', function (event) {
    toggleWindow();
  })
}


const toggleWindow = () => {
  if (trayWindow.isVisible()) {
    trayWindow.hide()
  } else {
    showWindow();
  }
};

const getWindowPosition = () => {
  const windowBounds = trayWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)

  return {x: x, y: y}
}


const showWindow = () => {
  const position = getWindowPosition();
  trayWindow.setPosition(position.x, position.y, false);
  trayWindow.show();
  trayWindow.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
