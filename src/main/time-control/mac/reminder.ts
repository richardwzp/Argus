import Electron, { BrowserWindow, app } from 'electron';
import path from 'path';
import { Channels } from '../../ipc-events/preload-events';
import { resolveHtmlPath } from '../../util';

export default async function timesUp(
  seconds: number,
  win: BrowserWindow,
): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
  win.webContents.send(Channels.TIMES_UP);
  const newWindow = new BrowserWindow({
    show: false,
    width: 300,
    height: 200,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../../../.erb/dll/preload.js'),
    },
  });
  newWindow.loadURL(
    `${resolveHtmlPath('index.html')}#break?breakDurationInSeconds=${10}`,
  );
  newWindow.show();
}

export function boostrapTimer(
  ipcMain: Electron.IpcMain,
  win: BrowserWindow,
  workSessionInSeconds: number,
) {
  win.on('ready-to-show', () => {
    timesUp(workSessionInSeconds, win);
    win.webContents.send(
      Channels.STARTING_SECONDS,
      workSessionInSeconds,
      new Date().getTime(),
    );
  });
  ipcMain.on(Channels.RESTART_TIMER, () => timesUp(workSessionInSeconds, win));
}
