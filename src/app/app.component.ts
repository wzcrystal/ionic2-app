import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ENV } from '@app/env';
import { WorkflowService } from '../pages/workflow/workflow.service';
import { LocalStorage } from '../scripts/service/local-storage.service';
import { LoadingService } from '../scripts/service/loading.service';

import { WorkflowPage } from '../pages/workflow/workflow';
import { LocalStorageKeys } from "../scripts/constant/constant";

//调用cordova插件时定义变量，避免代码检查时出错
declare let cordova;
declare let HandBridge;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WorkflowPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              workflowService: WorkflowService, local: LocalStorage, util: LoadingService) {
    //子应用写法
    /*let _this = this;
    util.showLoading();
    (<any>window).ACallBack=function (message) {
      var obj=JSON.parse(message);
      local.set(LocalStorageKeys.TOKEN,obj.token);
      local.set(LocalStorageKeys.USERID,obj.LOGINEXTRA.userId);
      _this.rootPage = WorkflowPage;
    };

    (<any>window).bCallBack=function () {
      window.localStorage.token=null;
      window.localStorage.userId=null;
      var onConfigBack=function() {
        if (platform.is('ios')) {
          cordova.exec(null, null, "BridgePlugin", "closeWebView", []);
        } else if (platform.is('android')) {
          var dict = {
            "className": "WebBridge",
            "function": "close",
            "successCallBack": "ACallBack",
            "failureCallBack": "bCallBack"
          };
          HandBridge.postMessage(JSON.stringify(dict));
        }
      };
      //hmsPopup.showOtherPopup('获取登录信息失败,将返回首页!',onConfigBack);
    };
    var dict={
      "className":"BaseBridge",
      "function":"getBaseInfo",
      "successCallBack":"ACallBack",
      "failureCallBack":"bCallBack"
    };
    HandBridge.postMessage(JSON.stringify(dict));


    var url=ENV.loginPath+
      '?grant_type=password&'+
      'client_id='+ENV.client_id+'&'+
      'client_secret='+ENV.client_secret+'&'+
      'username=pengzhong&'+
      'password=123456';

    workflowService.login(url).subscribe(
      data => {
        console.log(data);
        local.set(LocalStorageKeys.TOKEN,data['access_token']);
        local.set(LocalStorageKeys.USERID,data['userId']);
        _this.rootPage = WorkflowPage;
      },
      err => {console.log(err);}
    )*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

