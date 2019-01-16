import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() {
  }

  /**
   * 是否未定义
   * @param value: 需要判断是否未定义的数据
   * @return boolean
   * */
  isUndefined(value){
    return typeof value === 'undefined';
  }

  /**
   * json转换成字符串
   * @param obj: 需要转换的对象
   * @return 转换后的字符串
   * */
  jsonToString(obj) {
    if (this.isUndefined(obj)) return undefined;
    return JSON.stringify(obj);
  }
}
