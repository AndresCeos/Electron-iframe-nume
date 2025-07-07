const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any methods you need to communicate between main and renderer processes
  // For now, we'll keep it minimal since we're just displaying an iframe
});