import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class UtilService {

  constructor(public loadingCtrl: LoadingController) {
  }

  private loader;

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "加载中...",
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }
}
