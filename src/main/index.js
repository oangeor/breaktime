import { app, BrowserWindow, ipcMain, Tray } from 'electron'

const path = require('path')

let tray
let mainWindow // main window also known as settings window
let workWindow
let breakWindow
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const mainWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#settings`
  : `file://${__dirname}/index.html`

const workWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#work`
  : `file://${__dirname}/index.html`

const breakWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#break`
  : `file://${__dirname}/index.html`



function createMainWindow() {
  /*
  * Init window options
  */
  mainWindow = new BrowserWindow({
    height: 900,
    width: 500,
    show: false,
    frame: true,
    transparent: false,
    closable: false,
    maximizable: false,
    minimizable: false,
  })
  console.log(mainWinURL)
  mainWindow.loadURL(mainWinURL)
  // mainWindow.setPosition(0, 0, false)
  mainWindow.on('blur', () => {
    mainWindow.hide()
  })

}


function createWorkWindow() {
  workWindow = new BrowserWindow({
    height: 100,
    width: 320,
    frame: false,
    transparent: true,
    resizable: false,
    show: false
  })

  workWindow.loadURL(workWinURL)
  workWindow.setPosition(600, 0, false)
}

function createBreakWindow() {
  breakWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    show: false,
    // alwaysOnTop: true
  })
  breakWindow.loadURL(breakWinURL)
  breakWindow.maximize()
}



const createTray = () => {
  tray = new Tray(path.join(__static, 'tray_icon.png'))
  tray.on('click', function (event) {
    if (breakWindow.isVisible()) {
      return // 
    }
    toggleWindow()
  })
}


const toggleWindow = () => {
  if (workWindow.isVisible()) {
    workWindow.hide()
  } else {
    showWorkWindow()
    mainWindow.hide()
  }
}

const getWindowPosition = () => {
  const windowBounds = workWindow.getBounds()
  const trayBounds = tray.getBounds()
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)
  return { x: x, y: y }
}


const showWorkWindow = () => {
  const position = getWindowPosition()
  workWindow.setPosition(position.x, position.y, false)
  workWindow.show()
  workWindow.focus()
}



/**
 * App 
 */
app.on('ready', () => {
  // createTray()
  // createMainWindow()
  // createWorkWindow()
  createBreakWindow()

  breakWindow.show()
})

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', () => {
  // showWindow()
})


ipcMain.on('hide-settings-window', () => {
  console.log("stop close.......")
  mainWindow.hide()
})

ipcMain.on('quit-app', () => {
  app.exit()
})


ipcMain.on('timer-completed', (event, payload) => {
  mainWindow.webContents.send('timer-completed', payload)
})

ipcMain.on('settings-start', () => {
  mainWindow.show()
  workWindow.hide()
})

ipcMain.on('break-start', (event, breakMin) => {
  console.log("...main  break start")
  breakWindow.show()
  workWindow.hide()
  breakWindow.webContents.send('break-start', breakMin)
})

ipcMain.on('work-start', (event, workMin) => {
  console.log("...main  work start")
  // workWindow.show()
  breakWindow.hide()
  workWindow.webContents.send('work-start', workMin)
})

ipcMain.on('break-delay', (event, delayMin) => {
  console.log("main break-delay.....")
  breakWindow.hide()
  workWindow.webContents.send('break-delay', delayMin)
  mainWindow.webContents.send('break-delay')
})

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
