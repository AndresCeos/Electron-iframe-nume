const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, '../assets/icon.ico'), // Application icon
    titleBarStyle: 'default',
    show: false
  });

  // Configure session to allow iframe embedding
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' data: https:; frame-src https: data:; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https:; style-src \'self\' \'unsafe-inline\' https:; img-src \'self\' data: https:; connect-src \'self\' https: wss:;']
      }
    });
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5000');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, the dist folder is at the app root level
    const indexPath = path.join(__dirname, '../dist/public/index.html');
    console.log('Loading from:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});