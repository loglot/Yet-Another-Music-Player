  const {protocol, app, BrowserWindow, globalShortcut } = require('electron')
  const path = require('path');
  const fs = require('fs');

const createWindow = () => {
const win = new BrowserWindow({
  width: 592,
  height: 508,
  transparent: true, frame: false,
})
win.webContents.executeJavaScript(`window.WebEdition = false`)
win.setIgnoreMouseEvents(true)
win.setAlwaysOnTop(true, 'screen');
  win.loadFile('index.html')
   win.setFullScreen(true)
  // win.webContents.on('did-finish-load', () => {
  const expand = globalShortcut.register('alt+shift+A', () => {
    win.webContents.executeJavaScript(`window.Expand = true`)
  })
  const pause = globalShortcut.register('alt+shift+P', () => {
    win.webContents.executeJavaScript(`window.Pause = true`)
  })
  const skip = globalShortcut.register('alt+shift+S', () => {
    win.webContents.executeJavaScript(`window.Skip = true`)
  })
  const keys = globalShortcut.register('alt+shift+K', () => {
    win.webContents.executeJavaScript(`window.KeyBinds = true`)
  })
    
const directoryPath = path.join(__dirname, './music');
var songList = []
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
      songList[songList.length]=`"${file}"`
    });
    console.log(songList); 
    win.webContents.executeJavaScript(`window.songList=[${songList}]`)
});
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})