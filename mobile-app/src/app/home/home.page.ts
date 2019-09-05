import { Component, NgZone } from '@angular/core';
import { DataStorageService } from '../core/dataservice/data-storage.dataservice';
import { OnesignalDevice } from '../core/model/onesignal-device.model';
import { NotificationData } from '../core/model/onesignal-notification';
import { LocalStorage } from '../core/dataservice/local-storage.dataservice';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  onesignalDevice: OnesignalDevice;
  notificationData: NotificationData[] = [];

  constructor(
    private _dataStorageService: DataStorageService,
    private _zone: NgZone
  ) {
    this._loadOldNotifications();
    this._listenForData();
  }

  clearNotifications(){
    this.notificationData = [];
    LocalStorage.saveData('onesignal-notifications', JSON.stringify([]));
  }

  private _loadOldNotifications() {
    let oldNotifications = LocalStorage.getData('onesignal-notifications')
    let notificationDataLocal = (oldNotifications != null) ? JSON.parse(oldNotifications) as NotificationData[] : [];
    this.notificationData = notificationDataLocal;
  }

  private _listenForData() {
    this._dataStorageService.onesignalDeviceChange.subscribe((onesignalDevice: OnesignalDevice) => {
      this.onesignalDevice = onesignalDevice;
    });

    this._dataStorageService.onesignalNotificationChange.subscribe((notificationData: NotificationData) => {
      console.log('notificationData', notificationData);
      if (notificationData.payload) {
        let oldNotifications = LocalStorage.getData('onesignal-notifications');
        let notificationDataLocal = (oldNotifications != null) ? JSON.parse(oldNotifications) as NotificationData[] : [];
        notificationDataLocal.push(notificationData);
        this._zone.run(()=>{
          this.notificationData = notificationDataLocal;
        });
        LocalStorage.saveData('onesignal-notifications', JSON.stringify(notificationDataLocal));
      }
    });
  }
}
