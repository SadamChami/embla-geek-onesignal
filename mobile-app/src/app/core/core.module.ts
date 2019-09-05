import { NgModule } from '@angular/core';
import { DataStorageService } from './dataservice/data-storage.dataservice';

@NgModule({
    declarations: [
        // DialogBox
    ],
    entryComponents: [],
    imports: [],
    providers: [
        DataStorageService
    ],
    bootstrap: []
})
export class CoreModule { }