  const {protocol, app, BrowserWindow } = require('electron')
  const path = require('path');
  const fs = require('fs');


const createWindow = () => {
const win = new BrowserWindow({
  width: 192000,
  height: 108000,
  transparent: true, frame: false
})
win.setIgnoreMouseEvents(true)
win.setAlwaysOnTop(true, 'screen');
  win.loadFile('index.html')
   win.setFullScreen(true)
  // win.webContents.on('did-finish-load', () => {
    
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



