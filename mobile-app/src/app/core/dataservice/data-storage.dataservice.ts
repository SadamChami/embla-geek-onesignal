import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { OnesignalDevice } from '../model/onesignal-device.model';
import { NotificationData } from '../model/onesignal-notification';


@Injectable()
export class DataStorageService {

    // ---- [private] BehaviorSubjects ----
    private _onesignalDevice: BehaviorSubject<OnesignalDevice> = new BehaviorSubject( new OnesignalDevice() );
    private _onesignalNotification: BehaviorSubject<NotificationData> = new BehaviorSubject( new NotificationData() );

    
    // ---- [readonly] Data Observable ----
    public readonly onesignalDeviceChange: Observable<OnesignalDevice>;
    public readonly onesignalNotificationChange: Observable<NotificationData>;

    

    
    constructor() {
        this.onesignalDeviceChange = this._onesignalDevice.asObservable();
        this.onesignalNotificationChange = this._onesignalNotification.asObservable();
    }

    public updateOnesignalDevice( onesignalDevice : OnesignalDevice){
        this._onesignalDevice.next( onesignalDevice);
    }

    public updateNotificationData( notificationData : NotificationData){
        this._onesignalNotification.next( notificationData);
    }
}