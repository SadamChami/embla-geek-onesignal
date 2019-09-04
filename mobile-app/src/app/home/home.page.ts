import { Component } from '@angular/core';
import { DataStorageService } from '../core/dataservice/data-storage.dataservice';
import { OnesignalDevice } from '../core/model/onesignal-device.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  onesignalDevice: OnesignalDevice;

  constructor(
    private _dataStorageService: DataStorageService
  ) { 
    this._listenForData();
  }

  private _listenForData() {
    this._dataStorageService.onesignalDeviceChange.subscribe((onesignalDevice: OnesignalDevice) => {
      this.onesignalDevice = onesignalDevice;
    });
  }
}
