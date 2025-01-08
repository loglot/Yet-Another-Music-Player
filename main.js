  const {protocol, app, BrowserWindow } = require('electron')
  const path = require('path');
  const fs = require('fs');

  
const createWindow = () => {
const win = new BrowserWindow({
  width: 192000,
  height: 108000,
  transparent: true, frame: false
})
// win.setIgnoreMouseEvents(true)
win.setAlwaysOnTop(true, 'screen');
  win.loadFile('index.html')
  // win.setFullScreen(true)
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




//joining path of directory 
const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});