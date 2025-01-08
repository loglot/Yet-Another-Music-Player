  const {protocol, app, BrowserWindow } = require('electron')
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