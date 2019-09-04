import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal, OSNotification, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';

import { FIREBASE_PROJECT_ID, ONESIGNAL_APP_ID } from './shared/constants/const-onesignal';
import { DialogBox } from './shared/components/dialog-box';
import { LocalStorage } from './core/dataservice/local-storage.dataservice';
import { OnesignalDevice } from './core/model/onesignal-device.model';
import { DataStorageService } from './core/dataservice/data-storage.dataservice';
import { NotificationData, NotificationOpened } from './core/model/onesignal-notification';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,

    private dialogBox: DialogBox,
    private _dataStorageService: DataStorageService
  ) {
    this._initializeApp();
  }

  private _initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this._initOneSignal();
      this.splashScreen.hide();
    });
  }

  private _initOneSignal() {
    this.oneSignal.startInit(ONESIGNAL_APP_ID, FIREBASE_PROJECT_ID);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.handleNotificationReceived().subscribe((_data: any) => {
      // do something when notification is received
      // console.log('handleNotificationReceived', _data);
      let notificationData = _data as NotificationData;
      console.log('notificationData-base', notificationData);
      this._dataStorageService.updateNotificationData(notificationData);
      // this.dialogBox.showSuccess(JSON.stringify(_data));
    });
    this.oneSignal.handleNotificationOpened().subscribe((_data: any) => {
      // do something when a notification is opened
      // console.log('handleNotificationOpened', _data);
      let notificationData = _data as NotificationOpened;
      this._dataStorageService.updateNotificationData(notificationData.notification);
      // this.dialogBox.showSuccess(JSON.stringify(_data));
    });
    this.oneSignal.getIds().then(_id => {
      this._dataStorageService.updateOnesignalDevice(_id as OnesignalDevice);
      LocalStorage.saveData('onesignal-token', JSON.stringify(_id));
    }).catch(_err => {
      this.dialogBox.showError('Unable to register push notification - ' + JSON.stringify(_err));
    });
    this.oneSignal.endInit();
  }
}
