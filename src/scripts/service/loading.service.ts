import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class LoadingService {
  private loader; //加载变量

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
  }

  /*****************加载中方法********************/
  //加载中显示
  showLoading(text?) {
    if(!this.loader){
      this.loader = this.loadingCtrl.create({
        content: text?text:"加载中...",
      });
      this.loader.present();
    }
  }
  //加载中隐藏
  hideLoading() {
    if(this.loader){
      this.loader.dismiss();
      this.loader = undefined;
    }
  }
  /*****************加载中方法结束********************/


  /********************toast方法*******************************/
  /**
   * 说明：toast一般用于成功类或者表单信息某项数据未填写的提醒，正常的短时间提醒都用这种，除非错误信息或者其他重要信息则使用弹框
   * @param context:提示的内容
   * @param duration:toast显示时长，此参数选填
   * */
  showToastCenter(context, duration?){
    const toast = this.toastCtrl.create({
      message: context,
      duration: duration?duration:2500,
      position: 'middle',
      cssClass: 'align-center'
    });
    toast.present();
  }
  /********************toast方法结束*******************************/

  /********************alert方法*******************************/
  /**
   * 说明：错误信息或者其他重要信息则使用弹框，例如更新失败，则将失败的错误信息弹出来，如果是列表页面的数据查询失败则直接使用错误页面显示在页面中，不用弹框
   * @param context:显示内容
   * @param callback:点击按钮之后的回掉函数，可选
   * */
  showBaseAlert(context,callback?){
    const alert = this.alertCtrl.create({
      //title: '提示',
      message: context,
      enableBackdropDismiss:false,
      buttons: [{
        text: '我知道了',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            if(callback){
              callback();
            }
          });
          return false;
        }
      }]
    });
    alert.present();
  }
  /********************alert方法结束*******************************/


  /********************confirm方法*******************************/
  /**
   * 说明：确认框，用来显示询问用户的信息，例如是否保存等提示
   * @param context:显示内容
   * @param confirmCallback:点击确认按钮之后的回掉函数，可选
   * @param cancelCallback: 点击取消之后的回掉函数，可选
   * */
  showBaseConfirm(context,confirmCallback?,cancelCallback?){
    return new Promise( () => {
      let alert = this.alertCtrl.create({
        //title: '提示',
        message: context,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'color-gray',
            handler: () => {
              if(cancelCallback){
                cancelCallback();
              }
            }
          },
          {
            text: '确定',
            handler: () => {
              if(confirmCallback){
                confirmCallback();
              }
            }
          }
        ]
      });
      alert.present();
    });
  }
  /********************confirm方法结束*******************************/

  /*********************更新弹出框***********************/
  /**
   * 大版本更新弹框
   * @param context:显示内容
   * @param callback:点击按钮之后的回掉函数
   * */
  showBigUpdateAlert(context,callback){
    const alert = this.alertCtrl.create({
      title: '有新的APP啦！',
      message: context,
      enableBackdropDismiss:false,
      cssClass: 'update-alert',
      buttons: [{
        text: '马上去更新',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            if(callback){
              callback();
            }
          });
          return false;
        }
      }]
    });
    alert.present();
  }
  /**
   * 小版本更新确认框
   * @param context:显示内容
   * @param confirmCallback:点击确认按钮之后的回掉函数
   * @param cancelCallback: 点击取消之后的回掉函数，可选
   * */
  showUpdateConfirm(context,confirmCallback,cancelCallback?){
    let alert = this.alertCtrl.create({
      title: '有新内容更新啦！',
      message: context,
      enableBackdropDismiss:false,
      cssClass: 'update-alert',
      buttons: [
        /*{
          text: '下次再说',
          role: 'cancel',
          cssClass: 'color-gray',
          handler: () => {
            if(cancelCallback){
              cancelCallback();
            }
          }
        },*/
        {
          text: '马上更新',
          handler: () => {
            if(confirmCallback){
              confirmCallback();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
