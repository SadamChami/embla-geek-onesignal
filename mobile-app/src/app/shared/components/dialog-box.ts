import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogBox {
    constructor(public alertController: AlertController) { }

    public async showSuccess(message: string) {
        const alert = await this.alertController.create({
            header: 'Success!',
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }

    public async showError(message: string) {
        const alert = await this.alertController.create({
            header: 'Error!',
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }
}