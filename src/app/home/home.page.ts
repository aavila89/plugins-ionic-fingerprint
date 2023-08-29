import { Component, OnInit } from '@angular/core';
import {FingerprintAIO, FingerprintOptions} from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  fpo!: FingerprintOptions;
  available!: string;

  constructor(
    private fp: FingerprintAIO,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.fpo = {
      title: 'Title Fingerprint', //(android only)
      cancelButtonTitle: 'Cancel Button', //(android only)
      disableBackup: true
    };

    this.platform.ready().then(() => {
      this.fp.isAvailable().then((result) => {
        this.available = result;
        console.log({result});
      }).catch((err) => {
        console.log({err});
      });
    });
  }

  onClick() {
    if (this.available === 'finger' || this.available === 'face') {
      //@ts-ignore
      this.fp.show(this.fpo).then((success: string) => {
          // Fingerprint/Face was successfully verified
         this.presentAlert('', success);
      }).catch((error: any) => {
          // Fingerprint/Face was not successfully verified
          this.presentAlert('', error.message);
      });
    }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
