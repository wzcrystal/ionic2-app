import { Component } from '@angular/core';
import {NavController, ModalController, Platform} from 'ionic-angular';

import { FilterPage } from './filter/filter';
import { LoadingService } from "../../scripts/service/loading.service";

declare let cordova;
declare let HandBridge;

@Component({
  selector: 'page-home',
  templateUrl: 'workflow.html'
})
export class WorkflowPage {

  constructor(private platform: Platform, public navCtrl: NavController,
              public modalCtrl: ModalController, public util: LoadingService) {
    //util.hideLoading();
  }

  /*****************变量********************/
  listStatus = {
    todo:true,
    done:false,
    mine:false
  }


  //操作
  isOpera=false;
  //待办数据
  waitDoData=[];

  //点击操作
  opera(){
    this.isOpera = !this.isOpera;
  }

  //待办
  fetchTodoList(){
    this.listStatusChange('todo');
  }

  //已办
  fetchDoneList(){
    this.listStatusChange('done');
  }

  //我的
  fetchMineList(){
    this.listStatusChange('mine');
  }

  //下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  /*doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {

        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }*/
  doInfinite(infinite){
    console.log('Begin async operation');

    setTimeout(() => {

      console.log('Async operation has ended');
      infinite.complete();
    }, 500);
  }

  //状态切换
  listStatusChange(status){
    this.listStatus.todo=false;
    this.listStatus.done=false;
    this.listStatus.mine=false;
    this.listStatus[status]=true;
    console.log(this.listStatus);
  }

  //全选
  selectAll(){

  }

  //审批拒绝
  refuse(){

  }

  //审批通过
  accept(){

  }

  //筛选
  toFilter(){
    let filterModal = this.modalCtrl.create(FilterPage,{ userId: 8675309 },{cssClass:'wf-modal'});
    filterModal.onDidDismiss(data => {
      console.log(data);
    })
    filterModal.present();
  }

  //返回
  back() {
    if (this.platform.is('ios')) {
      cordova.exec(null, null, "BridgePlugin", "closeWebView", []);
    } else if (this.platform.is('android')) {
      var dict = {
        "className": "WebBridge",
        "function": "close",
        "successCallBack": "ACallBack",
        "failureCallBack": "bCallBack"
      };
      HandBridge.postMessage(JSON.stringify(dict));}
  }

}
