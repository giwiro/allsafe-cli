const path = require('path');
const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  console.log('icon', path.join(__dirname, './src/assets/images/icon', '128x128.png'));
  const options = {
    title: 'Allsafe',
    width: isDev ? 1458 : 900,
    height: 680,
    minWidth: 900,
    minHeight: 680,
    show: false,
    icon: path.join(__dirname, './src/assets/images/icon', '128x128.png'),
  };
  mainWindow = new BrowserWindow(options);
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.setMenu(null);
    mainWindow.show();
  });
  if (isDev) {
    console.log('Started in development mode');
    mainWindow.loadURL('http://localhost:3000');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }else {
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});