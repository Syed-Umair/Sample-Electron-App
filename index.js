const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;
var win = null;

app.on('ready', ()=>{
	win = new BrowserWindow({
		title:"JSHOTS",
		width:800, 
		height:600,
		});
	win.loadURL(`file://${__dirname}/index.html`);
	globalShortcut.register('CommandOrControl+Tab', () => {
  	  			win.webContents.executeJavaScript("$('li:visible:first').trigger('click');");
      	});
});	  		

app.on('window-all-closed', () => {
	win = new BrowserWindow({
		title:"JSHOTS",
		});
  	win.loadURL(`file://${__dirname}/exit.html`);
  	setTimeout(()=>app.quit(),2000);
});
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
]);