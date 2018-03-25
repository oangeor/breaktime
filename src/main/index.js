import {app, BrowserWindow, ipcMain, Tray} from 'electron'

let tray = undefined;
let mainWindow = undefined;
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
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 320,
    show: false,
    frame: false,
    transparent: true,
  });

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.on('blur', () => {
    // mainWindow.hide();
  })

  mainWindow.on('ready-to-show', () => {
    showWindow()
    setTimeout(() => {
      mainWindow.hide()
    }, 3000)
  })
}

app.on('ready', () => {
  createTray();
  createWindow();
  // mainWindow.show()

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // if (mainWindow === null) {
  // createWindow()
  // }
  mainWindow.show()
  mainWindow.focus()
});
// const assetsDirectory = path.join(__static, '../')
// createTray
const createTray = () => {
  tray = new Tray(path.join(__static, 'tray_icon.png'));
  tray.on('click', function (event) {
    toggleWindow();
  })
}


const toggleWindow = () => {
  if (mainWindow.isVisible()) {

    mainWindow.hide()
  } else {
    showWindow();
  }
};

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  console.log('index tra bounds')
  console.log(trayBounds)
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)

  return {x: x, y: y}
}


const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
});

ipcMain.on('get-tray-bounds', (event, arg) => {
  event.returnValue = tray.getBounds()
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
