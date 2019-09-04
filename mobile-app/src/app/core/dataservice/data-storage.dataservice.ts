import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { OnesignalDevice } from '../model/onesignal-device.model';


@Injectable()
export class DataStorageService {

    // ---- [private] BehaviorSubjects ----
    private _onesignalDevice: BehaviorSubject<OnesignalDevice> = new BehaviorSubject( new OnesignalDevice() );

    
    // ---- [readonly] Data Observable ----
    public readonly onesignalDeviceChange: Observable<OnesignalDevice>;

    

    
    constructor() {
        this.onesignalDeviceChange = this._onesignalDevice.asObservable();
    }

    public updateOnesignalDevice( onesignalDevice : OnesignalDevice){
        this._onesignalDevice.next( onesignalDevice);
    }
}