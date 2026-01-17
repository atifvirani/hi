import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initDatabase } from './database' // Now importing from the same folder
import { startServer } from './server'   // Now importing from the same folder

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'), // Note: template uses .mjs
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// --- APP LIFECYCLE ---

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.tssaloon.app')

  // 1. Initialize Database
  try {
    initDatabase();
    console.log("✅ Database initialized");
  } catch (e) {
    console.error("❌ Database failed:", e);
  }

  // 2. Start Local Tablet Server
  try {
    startServer();
    console.log("✅ Server started");
  } catch (e) {
    console.error("❌ Server failed:", e);
  }

  // 3. Create Window
  createWindow()

  // IPC Handlers
  ipcMain.handle('get-ip', () => require('ip').address());
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
