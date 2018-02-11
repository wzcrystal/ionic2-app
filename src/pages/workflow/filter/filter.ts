import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {

  constructor(public params: NavParams,
              public viewCtrl: ViewController) {
    console.log('UserId', params.get('userId'));
  }

  /*变量*/
  filterType = [{ //类型
    id:0,
    name:'全部'
  },{
    id:1,
    name:'提交人'
  },{
    id:2,
    name:'工作流类型'
  }];
  filterTypeChoseId = 0;  //选中的类型，用来区分样式

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  choseType(id) {
    this.filterTypeChoseId = id;
  }

}
